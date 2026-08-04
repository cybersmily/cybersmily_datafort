import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare const google: any;
declare const gapi: any;

const DRIVE_FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files';
const DOWNLOAD_URL = 'https://www.googleapis.com/drive/v3/files';

export interface PickedFile {
  fileId: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class GoogleDriveService {
  private tokenClient: any = null;
  private accessToken: string | null = null;
  private accessTokenExpiresAt = 0;
  private pickerLoaded = false;

  isConfigured(): boolean {
    const cfg = environment.googleDrive;
    return !!(cfg.clientId && cfg.apiKey && cfg.appId);
  }

  async pickFile(): Promise<PickedFile | null> {
    console.log('[drive] pickFile: ensuring access token');
    await this.ensureAccessToken();
    console.log('[drive] pickFile: token ready, loading picker library');
    await this.ensurePickerLoaded();
    console.log('[drive] pickFile: picker library loaded, building picker');

    return new Promise<PickedFile | null>((resolve, reject) => {
      try {
        const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
          .setMimeTypes('application/json')
          .setIncludeFolders(true)
          .setSelectFolderEnabled(false)
          .setMode(google.picker.DocsViewMode.LIST);

        const picker = new google.picker.PickerBuilder()
          .setOAuthToken(this.accessToken)
          .setDeveloperKey(environment.googleDrive.apiKey)
          .setAppId(environment.googleDrive.appId)
          .setOrigin(window.location.protocol + '//' + window.location.host)
          .addView(view)
          .setCallback((data: any) => {
            console.log('[drive] picker callback', data);
            if (data.action === google.picker.Action.PICKED) {
              const doc = data.docs?.[0];
              resolve(doc ? { fileId: doc.id, name: doc.name } : null);
            } else if (data.action === google.picker.Action.CANCEL) {
              resolve(null);
            }
          })
          .build();
        console.log('[drive] picker built, making visible');
        const savedScrollY = window.scrollY;
        const savedScrollX = window.scrollX;
        picker.setVisible(true);
        const restore = () => window.scrollTo(savedScrollX, savedScrollY);
        requestAnimationFrame(restore);
        setTimeout(restore, 50);
        setTimeout(restore, 200);
      } catch (err) {
        console.error('[drive] picker build/show failed', err);
        reject(err);
      }
    });
  }

  async loadFile<T = any>(fileId: string): Promise<T> {
    await this.ensureAccessToken();
    const resp = await fetch(`${DOWNLOAD_URL}/${encodeURIComponent(fileId)}?alt=media`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    if (!resp.ok) {
      throw new Error(`Drive download failed: ${resp.status} ${await resp.text()}`);
    }
    return (await resp.json()) as T;
  }

  async getFileMeta(fileId: string): Promise<{ id: string; name: string; canEdit: boolean }> {
    await this.ensureAccessToken();
    const url = `${DOWNLOAD_URL}/${encodeURIComponent(fileId)}?fields=id,name,capabilities(canEdit,canModifyContent)`;
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    if (!resp.ok) {
      throw new Error(`Drive metadata fetch failed: ${resp.status} ${await resp.text()}`);
    }
    const data = await resp.json();
    const canEdit = !!(data.capabilities?.canEdit && data.capabilities?.canModifyContent);
    return { id: data.id, name: data.name, canEdit };
  }

  /**
   * Create (fileId=null) or update an existing Drive file. Returns the fileId.
   * On create, `filename` sets the file's name. On update, the file's existing
   * name is preserved (rename it in Drive if you want a different name).
   */
  async saveFile(fileId: string | null, filename: string, jsonContent: string): Promise<string> {
    await this.ensureAccessToken();

    const metadata: Record<string, any> = fileId
      ? {}
      : { name: filename, mimeType: 'application/json' };
    const boundary = `cs_drive_${Date.now().toString(36)}`;
    const body =
      `--${boundary}\r\n` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\n` +
      `Content-Type: application/json\r\n\r\n` +
      `${jsonContent}\r\n` +
      `--${boundary}--`;

    const url = fileId
      ? `${UPLOAD_URL}/${encodeURIComponent(fileId)}?uploadType=multipart`
      : `${UPLOAD_URL}?uploadType=multipart`;
    const method = fileId ? 'PATCH' : 'POST';

    const resp = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    });
    if (!resp.ok) {
      throw new Error(`Drive upload failed: ${resp.status} ${await resp.text()}`);
    }
    const result = await resp.json();
    return result.id;
  }

  signOut(): void {
    if (this.accessToken && typeof google !== 'undefined') {
      google.accounts.oauth2.revoke(this.accessToken, () => {});
    }
    this.accessToken = null;
    this.accessTokenExpiresAt = 0;
  }

  private async ensureAccessToken(): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Google Drive integration is not configured (missing clientId / apiKey / appId in environment).');
    }
    if (this.accessToken && Date.now() < this.accessTokenExpiresAt - 60_000) {
      return;
    }
    await this.waitForGlobal('google', () => typeof google !== 'undefined' && !!google.accounts?.oauth2);

    if (!this.tokenClient) {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: environment.googleDrive.clientId,
        scope: DRIVE_FILE_SCOPE,
        callback: () => {},
      });
    }

    await new Promise<void>((resolve, reject) => {
      this.tokenClient.callback = (resp: any) => {
        if (resp.error) {
          reject(new Error(`OAuth failed: ${resp.error}`));
          return;
        }
        this.accessToken = resp.access_token;
        this.accessTokenExpiresAt = Date.now() + (Number(resp.expires_in) || 3600) * 1000;
        resolve();
      };
      this.tokenClient.requestAccessToken({ prompt: '' });
    });
  }

  private async ensurePickerLoaded(): Promise<void> {
    if (this.pickerLoaded) return;
    await this.waitForGlobal('gapi', () => typeof gapi !== 'undefined' && !!gapi.load);
    await new Promise<void>((resolve) => gapi.load('picker', { callback: () => resolve() }));
    this.pickerLoaded = true;
  }

  private waitForGlobal(label: string, check: () => boolean, timeoutMs = 10_000): Promise<void> {
    if (check()) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const tick = () => {
        if (check()) return resolve();
        if (Date.now() - start > timeoutMs) return reject(new Error(`Timed out waiting for ${label}`));
        setTimeout(tick, 100);
      };
      tick();
    });
  }
}
