# Google Drive Integration — Setup Guide

The Cyberpunk 2020 character generator can save and load character sheets directly to/from the signed-in user's Google Drive. This document describes the one-time Google Cloud Platform setup required to make those buttons functional.

## How it works

- **OAuth flow:** Google Identity Services (GIS) token client, in browser only. No backend, no refresh tokens, no client secret.
- **Scope:** `https://www.googleapis.com/auth/drive.file`. The app can only see files it created or files the user explicitly picks via the Google Picker. It cannot enumerate the user's Drive.
- **File format:** plain JSON, same shape as the existing local file save/load. Default filename `CP2020_<handle>.json`.
- **Identity persistence:** the app remembers the Drive file ID of the currently-loaded character in localStorage under `CP2020_CHAR_GEN_DRIVE_FILE_ID`, so subsequent "Save to Drive" clicks update the same file. "Reset" or loading a local file clears the association.
- **Token lifetime:** access tokens live ~1 hour, in memory only. Closing the tab forces re-auth on next use.

## Are these secrets?

**No.** Both the OAuth Client ID and the API key are public identifiers — they appear in browser JavaScript the moment any visitor loads the page. There is no client secret in this flow. What protects the credentials from abuse:

- **OAuth Client ID** is locked to specific **Authorized JavaScript Origins** (your domain). No other origin can use it.
- **API key** is locked to specific **HTTP referrers** and to the **Google Picker API** only.

Commit the values to `src/environments/environment.prod.ts` like any other config constant. Do not put them in sealed secrets or Helm values — they need to be baked into the built JS bundle.

## GCP Console setup (one-time)

### 1. Create or select a project

Go to <https://console.cloud.google.com/>, create a new project (suggested name: `cybersmily-chargen`).

Note the **Project number** — Console → Home → Project info. This is the `appId` value the Picker requires. It's all digits, distinct from the human-readable Project ID.

### 2. Enable required APIs

APIs & Services → Library. Enable both:

- **Google Drive API**
- **Google Picker API**

### 3. Configure the OAuth consent screen

APIs & Services → OAuth consent screen.

| Field | Value |
| --- | --- |
| User Type | External |
| App name | e.g. `Cybersmily Char Gen` |
| User support email | your email |
| Developer contact | your email |
| Scopes | `openid`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `.../auth/drive.file` |
| Test users | every Google account that should be allowed to sign in (up to 100) |

**Leave Publishing status as "Testing".** Do not click "Publish App" — that triggers Google's brand verification flow (logo review, homepage requirements, privacy policy). Testing mode supports up to 100 named users indefinitely and requires no verification.

To add more users later: OAuth consent screen → Test users → Add users. Anyone not on the list will see a "this app is unverified" hard block when they try to sign in.

### 4. Create the OAuth 2.0 Web Client

APIs & Services → Credentials → Create credentials → OAuth client ID.

- Application type: **Web application**
- Name: e.g. `cybersmily web`
- **Authorized JavaScript origins** (add both):
  - `https://cybersmily.ext.jrbhome.net`
  - `http://localhost:4200`
- Authorized redirect URIs: leave empty. The GIS token flow uses postMessage, not redirects.

Save. Copy the **Client ID** (ends in `.apps.googleusercontent.com`). This is the `clientId` value.

### 5. Create the API key

APIs & Services → Credentials → Create credentials → API key.

Immediately edit the new key:

- **Application restrictions** → **None**
- **API restrictions** → Restrict key → check **Google Picker API**

Save. Copy the key. This is the `apiKey` value.

> **Why no HTTP-referrer restriction?** It's the obvious thing to set, but it breaks the picker in Firefox. Firefox's Enhanced Tracking Protection strips the Referer header on cross-origin iframe requests (the picker UI is hosted at `docs.google.com` in an iframe and calls back to Google with your API key). With no Referer to check against, the referrer restriction rejects the request and the picker returns 401. Leaving Application restrictions at "None" plus the **API restriction to Picker API only** is the right tradeoff — an attacker who exfiltrated the key could only invoke the Picker JS UI from another origin, which is bounded (no data exfiltration possible, no quota-burning APIs reachable). Drive read/write still goes through OAuth tokens, which are origin-bound by the OAuth client config.

## Wire the values into the app

Edit [`src/environments/environment.prod.ts`](../src/environments/environment.prod.ts):

```ts
export const environment = {
  production: true,
  googleDrive: {
    clientId: '<OAuth Client ID, ends in .apps.googleusercontent.com>',
    apiKey: '<API key>',
    appId: '<Project number — all digits>',
  },
};
```

If you want the Drive buttons to work under `ng serve` locally, fill in the same shape in [`src/environments/environment.ts`](../src/environments/environment.ts). With empty strings, the buttons stay hidden (`isDriveConfigured` returns false) — no broken UI.

## Deploy

```sh
./bin/build && ./bin/deploy
```

After rollout, the character generator toolbar shows two new cloud icons:

- **Cloud-up** — Save current character to Drive. First click triggers Google consent. Subsequent saves update the same file (tracked by the stored `driveFileId`).
- **Cloud-down** — Open the Google Picker to choose a JSON file from Drive. Loading replaces the current character and re-associates the Drive file ID.

## Deep-link URLs

Once a character is saved to Drive, you can construct a shareable URL that opens it directly in the character generator:

```
https://cybersmily.ext.jrbhome.net/apps/chargen?driveFileId=<DRIVE_FILE_ID>
```

When the chargen route loads with a `driveFileId` query param, the app:

1. Triggers Google sign-in (silent if the user already has a token cached).
2. Fetches the file via `files.get` with the existing `drive.file` scope.
3. Replaces the current character and associates the new file ID for subsequent saves.

The `driveFileId` is the same opaque ID returned from `saveFile()` and visible in the Drive web UI's URL when a file is open. The deep link itself confers no access — recipients must already have Drive permission on the file (because the file is shared with them, or because they're the owner).

This is the closest "Open with" equivalent without a Workspace Marketplace listing. Bookmark a per-character URL, paste it in chat, etc. Refreshing the URL re-loads the file from Drive, so it's also a reasonable way to discard local edits.

A **link icon** appears in the toolbar whenever the current character is associated with a Drive file (after a successful save or open). Clicking it copies the deep-link URL to the clipboard — briefly swaps to a checkmark for visual confirmation. Falls back to a `window.prompt` if the Clipboard API is blocked (e.g., non-HTTPS dev contexts).

## Read-only files (viewer-only sharing)

When you open a Drive file you only have viewer access to (e.g. a campaign template a GM shared with you), the app detects this via Drive's `capabilities.canEdit` flag on the file metadata. The behavior:

- The **Save to Drive** button (cloud-up) is hidden — saving back would fail.
- A **lock icon** appears in the toolbar with a tooltip explaining the situation.
- The **Save As** button (copy icon) remains — clicking it creates your own editable copy in your Drive, switches the association to that new file, clears the read-only state, and from then on Save updates your copy.
- Local edits, local-file save, and PDF export continue to work normally — the read-only state only affects the *original Drive file*.

This is the standard "GM shares a template, players fork their own copy" workflow:

1. GM creates a character sheet, saves to Drive, sets sharing on the file to "Anyone with the link — Viewer", copies the deep-link from the toolbar, posts it in the campaign chat.
2. Each player opens the link → app loads the read-only template → player edits their character → clicks Save As → their own editable copy lands in their Drive.
3. Players' subsequent Save clicks update their own copy. GM's original template stays untouched.

## Operational notes

- **Behavior when the token expires:** the next Drive action triggers a silent re-grant via GIS. No user interaction required if they're still signed in to Google in the browser.
- **"Save As" semantics:** not exposed as a separate button. To branch a character, hit Reset (clears `driveFileId`), edit, then Save to Drive — the next save creates a new file.
- **Conflict handling:** none in v1. Last write wins. If you edit the same character on two devices and save from both, the later save overwrites the earlier without warning.
- **Revoking access:** users can revoke at <https://myaccount.google.com/permissions>. The app also has a `signOut()` method on the service if you want to expose a button later.
