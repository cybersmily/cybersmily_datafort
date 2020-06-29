/**
 * This is an interface for links on the navigation bar.
 * Title is the value to display, the link is for th href, and desc is for tooltips
 * @interface SiteLink
 */
export interface SiteLink {
  title: string;
  link: string;
  desc: string;
  download?: string;
  target?: string;
}



/**
 * Group object for site links
 * This can contain groups as well.
 * @interface SiteLinksGroup
 */
export interface SiteLinksGroup {
  groupTitle: string;
  description: string;
  links: (SiteLink|SiteLinksGroup)[];
}

// create the link tree for the top navigation
  export class TopNavLinks  {
    menuItems: SiteLinksGroup[];
    constructor() {
      this.menuItems = [];
      this.menuItems.push({
        groupTitle: 'Data',
        description: 'Under Data you will find charts, listings, and some adapted content.',
        links: [
          {title: 'CH2 Conversion', link: 'data/chrome2', desc: ''},
          {title: 'In the Media', link: 'data/inmedia', desc: ''},
          {title: 'Master Roles List', link: 'data/roles', desc: ''},
          {title: 'Master Skills List', link: 'data/skills', desc: ''},
          {title: 'More Guns', link: 'data/moreguns', desc: ''},
          {title: 'Proteus - Programs', link: 'data/proteus/prog', desc: ''},
          {title: 'Proteus - Decks, Cyber, Gear', link: 'data/proteus/gear', desc: ''},
          {title: 'Proteus - Sysops', link: 'data/proteus/sysops', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Mods',
        description: 'Under Mods you will find rule modifications to CP2020.',
        links: [
          {title: 'Alt Money', link: 'mods/money', desc: ''},
          {title: 'Character Build Points', link: 'mods/cbp', desc: ''},
          {title: 'Fumble', link: 'mods/fumble', desc: ''},
          {title: 'Init./Actions', link: 'mods/actions', desc: ''},
          {title: 'IP Rules', link: 'mods/ip', desc: ''},
          {title: 'LUCK', link: 'mods/luck', desc: ''},
          {title: 'Medtechs', link: 'mods/medtechs', desc: ''},
          {title: 'Quick NR', link: 'mods/nr', desc: ''},
          {title: 'Skills', link: 'mods/skills', desc: ''},
          {title: 'Special Abilities', link: 'mods/sa', desc: ''},
          {title: 'Stats/Careers', link: 'mods/careers', desc: ''},
          {title: 'Youth Path', link: 'mods/youth', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Shop',
        description: 'Under Shop you will find gear and equipment.',
        links: [
          {title: 'Cyberware', link: 'shop/cyber', desc: ''},
          {title: 'Gear', link: 'shop/gear', desc: ''},
          {title: 'Other', link: 'shop/other', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Peeps',
        description: 'Under Peeps you will find NPCs and corporations.',
        links: [
          {title: 'Cops/Corps', link: 'peeps/copscorps', desc: ''},
          {title: 'Fixers/Medias', link: 'peeps/fixermedia', desc: ''},
          {title: 'Medtechs/Netrunners', link: 'peeps/medtechnr', desc: ''},
          {title: 'Nomads/Rockerboys', link: 'peeps/nomadrocker', desc: ''},
          {title: 'Solos/Techies', link: 'peeps/solotechie', desc: 'soltech'},
          {title: 'Corporations', link: 'peeps/corp', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Gigs',
        description: 'Under Gigs you will find scenarios.',
        links: [
          {title: 'Dy in Lyte', link: 'gigs/dynlyte', desc: ''},
          {title: 'Got...', link: 'gigs/got', desc: ''},
          {title: 'Prometheus Chronicles', link: 'gigs/prometheus', desc: ''},
          {title: 'WNS News Force Reports', link: 'gigs/wns7', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Apps-2020',
        description: 'Under Apps you will find web page based application/utilities for Cyberpunk.',
        links: [
          {title: 'Character Generator', link: 'apps/chargen', desc: ''},
          {title: 'Combat Tracker', link: 'apps/cmbttrk', desc: ''},
          {title: 'Drug Lab', link: 'apps/druglab', desc: ''},
          {title: 'Fashion Calculator', link: 'apps/fashcalc', desc: ''},
          {title: 'Fixer Calculator', link: 'apps/fixcalc', desc: ''},
          {title: 'LifePath Generator', link: 'apps/lifepath', desc: ''},
          {title: 'Max Metal Calculator', link: 'apps/maxmetal', desc: ''},
          {title: 'Netrunner Navigator', link: 'apps/nrtrace', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Apps-RED',
        description: 'Under Apps you will find web page based application/utilities for Cyberpunk.',
        links: [
          {title: 'CP Red Jumpstart Kit Character', link: 'apps/qkpregen', desc: ''},
          {title: 'LifePath Red Generator', link: 'apps/lpredjmp', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'DLow',
        description: 'Under DLow you will find resources/files you can download.',
        links: [
          {title: 'PC Sheet', link: 'assets/PCsheet2.pdf', desc: '', download: 'PCsheet2.pdf', target: 'self' },
          {title: 'CC3+ NC Maps', link: 'dlow/cc3', desc: ''},
          {title: 'NC JPG Maps', link: 'dlow/maps', desc: ''}
        ]
      });
      this.menuItems.push({
        groupTitle: 'LDLs',
        description: 'Under LDLs you will find links to other Cyberpunk 2020 sites.',
        links: [
          {title: 'R. Talsorian', link: 'https://rtalsoriangames.wordpress.com/', desc: '', target: '_blank'},
          {title: 'Datafortress 2020', link: 'http://datafortress2020.com/', desc: '', target: '_blank'},
          {title: 'Cyberpunk 2077', link: 'http://cyberpunk.net/', desc: '', target: '_blank'},
          {title: 'Mockery', link: 'http://www.verminary.com/cyberpunk/', desc: '', target: '_blank'},
          {title: 'BlackHammer Project', link: 'http://www.ambient.ca/cpunk/', desc: '', target: '_blank'},
          {title: 'Karstens CP Arch.', link: 'https://www.cyberpunk2020.de/', desc: '', target: '_blank'},
          {title: 'Paper Dragon.', link: 'http://www.paper-dragon.com/', desc: '', target: '_blank'},
          {title: 'Views from the Edge', link: 'http://vfte.cyberpunk.co.uk/', desc: '', target: '_blank'},
          {title: 'Eric Dorsey CP Character Generator', link: 'https://ericdorsey.info/cp2020/index.html', desc: '', target: '_blank'},
          {title: 'Cyberpunk Red Character Generator', link: 'https://cyberpunk-char-gen.neocities.org', desc: '', target: '_blank'},
          {title: 'Moosh Cyberpunk FDE + Lifepath Generator', link: 'https://www.moosh.net/cp2020/', desc: '', target: '_blank'},
          {title: 'Dodo Cyberpunk Character Generator', link: 'http://members.dodo.com.au/~boyleholdings/cyberpunk/#4thPage', desc: '', target: '_blank'},
          {title: 'Laurel Cadre Goon Generator', link: 'http://www.laurelcadre.com/cp_goon/', desc: '', target: '_blank'},
          {title: 'Mad Queen Show', link: 'https://www.youtube.com/channel/UC0G5rpOFcY6pOdtKsCE0p2A', desc: '', target: '_blank'},
          {title: 'JonJon theWise', link: 'https://www.youtube.com/channel/UCTZML8xYXTyuEaCb9ette6Q', desc: '', target: '_blank'},
          {title: 'Mr Welch', link: 'https://www.youtube.com/channel/UC3NteHN3fWXXMaLXjMMHRkA', desc: '', target: '_blank'},
          {title: 'PunkGenerator', link: 'https://www.youtube.com/channel/UCrB_VVl4kFsMiQFw_h6RKfg', desc: '', target: '_blank'},
          {title: 'The Dark Future', link: 'https://www.youtube.com/channel/UCdppRwWMT7V7hfqI4ZncZBg', desc: '', target: '_blank'},
          {title: 'Tokyo Red: Cyberpunk Red',
            link: 'https://www.youtube.com/playlist?list=PLM-HN-1Cf8rggbs5RiHn-OkUjncMTAzYE', desc: '', target: '_blank'},
          {title: 'Tabletop Cyberpujnk 2020',
            link: 'https://www.youtube.com/watch?v=efRE_tqUkhY&list=PLr8mrSTjqGo6-A9QBncTWvj96GKALCfae', desc: '', target: '_blank'},
          {title: 'HSG Cyberpujnk 2020',
            link: 'https://www.youtube.com/watch?v=u2YNS-IHmvM&list=PLW2YGZCblxbdtK-CP0zETLS1Uq15XiUBU', desc: '', target: '_blank'},
          {title: 'Die Party Nightcity',
            link: 'https://www.youtube.com/watch?v=_nU7Ihi_wDs&list=PL6hA9KBc10-6nIi7s6y-GdIcvRBYvZNIN', desc: '', target: '_blank'},
          {title: 'Hokie200proof Cyberpunk',
            link: 'https://www.youtube.com/watch?v=utbv55gCjW4&list=PLMeyxv3x0N0tPan0m-l8KeL3hp8UBGohv', desc: '', target: '_blank'}
        ]
      });
    }

    /**
     * Check if the objec is a SiteLink interface.
     * @static
     * @param {*} val
     * @returns {boolean}
     * @memberof TopNavLinks
     */
    public isSiteLink(val: any): boolean {
      return typeof(val.title) !== 'undefined' && typeof(val.link) !== 'undefined' || typeof(val.desc) !== 'undefined';
    }
  }
