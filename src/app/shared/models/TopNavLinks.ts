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
  link?: string;
  links: (SiteLink)[];
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
          {title: 'CH2 Conversion', link: 'data/chrome2', desc: 'Conversion of Chromebook 2 vehicles to Maximum Metal rules.'},
          {title: 'In the Media', link: 'data/inmedia',
            desc: 'Movies, TV shows, Books, anime, manga, webisodes, etc for Cyberpunk inspiration'},
          {title: 'Master Cyberware List', link: 'data/cyber', desc: 'List of all canon roles in Cyberpunk 2020'},
          {title: 'Master Roles List', link: 'data/roles', desc: 'List of all canon roles in Cyberpunk 2020'},
          {title: 'Master Skills List', link: 'data/skills', desc: 'List of all canon skills in Cyberpunk 2020'},
          {title: 'Master Weapons List', link: 'data/wpns', desc: 'List of all canon weapons in Cyberpunk 2020'},
          {title: 'More Guns', link: 'data/moreguns', desc: 'Guns updated from R. Talsorian\'s Edge of Sword supplement'},
          {title: 'Proteus - Programs', link: 'data/proteus/prog',
            desc: 'Convert programs based from the Netrunner CCG expansion.'},
          {title: 'Proteus - Decks, Cyber, Gear', link: 'data/proteus/gear',
            desc: 'Convert gear based from the Netrunner CCG expansion.'},
          {title: 'Proteus - Sysops', link: 'data/proteus/sysops',
            desc: 'Convert sysops based from the Netrunner CCG expansion.'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Mods',
        description: 'Under Mods you will find rule modifications to CP2020.',
        links: [
          {title: 'Alt Money', link: 'mods/money',
            desc: 'Alternative starting money system for Cyberpunk 2020.'},
          {title: 'Character Build Points', link: 'mods/cbp',
            desc: 'Character generation system using points to distribute to attributes, skills, and gear for Cyberpunk 2020.'},
          {title: 'Fumble', link: 'mods/fumble',
            desc: 'Optional rules for how to handle fumbles in Cyberpunk 2020.'},
          {title: 'Init./Actions', link: 'mods/actions',
            desc: 'Differnt take on the Action system for Cyberpunk 2020.'},
          {title: 'IP Rules', link: 'mods/ip',
            desc: 'New set of IP rules base on the INT stat'},
          {title: 'LUCK', link: 'mods/luck',
            desc: 'Different system of how to use the LUCK stat.'},
          {title: 'Medtechs', link: 'mods/medtechs',
            desc: 'New Medtechie roles for Cyberpunk 2020.'},
          {title: 'Quick NR', link: 'mods/nr',
            desc: 'Simplified rules for netrunning for Cyberpunk 2020'},
          {title: 'Skills', link: 'mods/skills',
            desc: 'Breakdown of Cyberpunk 2020 skills on how they can be used and what DIFF/opposing rolls can be used.'},
          {title: 'Special Abilities', link: 'mods/sa',
            desc: 'Breakdown of Cyberpunk 2020 base roles and optional changes to their special abilities.'},
          {title: 'Stats/Careers', link: 'mods/careers',
            desc: 'Using perferred stats in Cyberpunk 2020 for Roles to gain some bonuses to skills and other things.'},
          {title: 'Youth Path', link: 'mods/youth',
            desc: 'Pre-lifepath system for fleashing out a character\' youth.'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Shop',
        description: 'Under Shop you will find gear and equipment.',
        links: [
          {title: 'Cyberware', link: 'shop/cyber', desc: 'Custom cyberware for Cyberpunk 2020'},
          {title: 'Gear', link: 'shop/gear', desc: 'Custom gear for Cyberpunk 2020'},
          {title: 'Other', link: 'shop/other', desc: 'Custom services and other options for Cyberpunk 2020'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Peeps',
        description: 'Under Peeps you will find NPCs and corporations.',
        links: [
          {title: 'Cops/Corps', link: 'peeps/copscorps', desc: 'Cop and Corporate NPCs'},
          {title: 'Fixers/Medias', link: 'peeps/fixermedia', desc: 'Fixer and Media NPCs'},
          {title: 'Medtechs/Netrunners', link: 'peeps/medtechnr', desc: 'Metech and Netrunner NPCs'},
          {title: 'Nomads/Rockers', link: 'peeps/nomadrocker', desc: 'Nomad and Rocker NPCs'},
          {title: 'Solos/Techies', link: 'peeps/solotechie', desc: 'Solo and Techie NPCs'},
          {title: 'Corporations', link: 'peeps/corp', desc: 'Corporations'},
          {title: 'Gangs/Nomad Packs', link: 'peeps/gangs', desc: 'Gangs'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Gigs',
        description: 'Under Gigs you will find scenarios.',
        links: [
          {title: 'Dy in Lyte', link: 'gigs/dynlyte', desc: 'Scenario with using Ianus Edge of Night supplement.'},
          {title: 'Got...', link: 'gigs/got', desc: 'Story about blackmail, murder, and investigation.'},
          {title: 'Prometheus Chronicles', link: 'gigs/prometheus', desc: 'Campaign for the getting stolen product back to BMS'},
          {title: 'WNS News Force Reports', link: 'gigs/wns7', desc: 'News nuggets taking place during the 4th Corporate War.'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Apps-2020',
        description: 'Under Apps you will find web page based application/utilities for Cyberpunk.',
        links: [
          {title: 'Character Generator', link: 'apps/chargen', desc: 'Cyberpunk 2020 character sheet.'},
          {title: 'Combat Tracker', link: 'apps/cmbttrk', desc: 'Cyberpunk 2020 combat tracking utiltiy.'},
          {title: 'Combat Zone Generator', link: 'apps/cmbtzone',
            desc: 'Cyberpunk 2020 Combat Zone generator will create a map of 3x4 blocks, with street objects and event rolls.'},
          {title: 'Drug Lab', link: 'apps/druglab', desc: 'Cyberpunk 2020 Drug Lab rules.'},
          {title: 'Fashion Calculator', link: 'apps/fashcalc', desc: 'Cyberpunk 2020 Clothes creation and list.'},
          {title: 'Fixer Calculator', link: 'apps/fixcalc', desc: 'Cyberpunk 2020 Fixe contact generator using rules from Wildside.'},
          {title: 'Headline Generator', link: 'apps/headlines', desc: 'Utility to generate news headlines for Cyberpunk 2020/Red.'},
          {title: 'LifePath Generator', link: 'apps/lifepath', desc: 'Cyberpunk 2020 Lifepaht generator.'},
          {title: 'Max Metal Calculator', link: 'apps/maxmetal', desc: 'Cyberpunk 2020 vehicle designer using Maximum Metal rules.'},
          {title: 'Netrunner Navigator', link: 'apps/nrtrace',
            desc: 'Cyberpunk 2020 netrunning map for accumulating trace and doing a run.'},
          {title: 'Netrunner Cyberdeck Manager', link: 'apps/deckmgr',
            desc: 'Cyberpunk 2020 netrunner deck manager to help with your netrunner\'s needs.'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Apps-RED',
        description: 'Under Apps you will find web page based application/utilities for Cyberpunk.',
        links: [
          {title: 'CP Red Jumpstart Kit Character', link: 'apps/qkpregen',
            desc: 'Cyberpunk Red Character generator based on tempates for the jumpstart kit.'},
          {title: 'Headline Generator', link: 'apps/headlines', desc: 'Utility to generate news headlines for Cyberpunk 2020/Red.'},
          {title: 'LifePath Red Generator', link: 'apps/lpredjmp', desc: 'Cyberpunk Red lifepath generator.'},
          {title: 'NET Architect Generator', link: 'apps/rednet', desc: 'Cyberpunk Red NET Architect generator.'},
          {title: 'Night Market Generator', link: 'apps/nightmarket', desc: 'Night Market generator for Cyberpunk Red.'},
          {title: 'Bodegas Generator', link: 'apps/nightmarket', desc: 'Bodegas generator for Cyberpunk Red.'},
          {title: 'Vendit Generator', link: 'apps/nightmarket', desc: 'Vendit generator for Cyberpunk Red.'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'DLow',
        description: 'Under DLow you will find resources/files you can download.',
        links: [
          {title: 'CP 2020 PC Sheet', link: 'assets/PCsheet2.pdf',
            desc: 'My take on the Cyberpunk 2020 character sheet.', download: 'PCsheet2.pdf', target: 'self' },
          {title: 'CC3+ NC Maps', link: 'dlow/cc3', desc: 'Campaign Cartographer files for Night City during 2020.'},
          {title: 'NC JPG Maps', link: 'dlow/maps', desc: 'Night City jpg files'},
          {title: 'NC Blueprints', link: 'dlow/blueprints', desc: 'Night City png and Campaign Cartographer blue print files'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'LDLs',
        description: 'Under LDLs you will find links to other Cyberpunk 2020/RED sites.',
        links: [
          {title: 'R. Talsorian', link: 'https://rtalsoriangames.wordpress.com/',
            desc: 'The main site for news and books for Cyberpunk.', target: '_blank'},
          {title: 'Datafortress 2020', link: 'http://datafortress2020.com/',
            desc: 'MUST MUST MUST VISIT! This is the greatest Cyberpunk site of them all.', target: '_blank'},
          {title: 'Cyberpunk 2077', link: 'http://cyberpunk.net/',
            desc: 'Computer game from CD Projekt Red', target: '_blank'},
          {title: 'Mockery', link: 'http://www.verminary.com/cyberpunk/',
            desc: 'An old but goodie. Great articles.', target: '_blank'},
          {title: 'BlackHammer Project', link: 'http://www.ambient.ca/cpunk/',
            desc: 'Another site to check out. Tons of content.', target: '_blank'},
          {title: 'Karstens CP Arch.', link: 'https://www.cyberpunk2020.de/',
            desc: 'One of the originals. ', target: '_blank'},
          {title: 'Paper Dragon.', link: 'http://www.paper-dragon.com/',
            desc: 'This is a site that inspired me to create this datafort.', target: '_blank'},
          {title: 'Views from the Edge', link: 'http://vfte.cyberpunk.co.uk/',
            desc: 'Great site form the UK. Has a active forum.', target: '_blank'},
          {title: 'Eric Dorsey CP Generator', link: 'https://ericdorsey.info/cp2020/index.html',
            desc: 'Great utility for Cyberpunk 2020 character generation.', target: '_blank'},
          {title: 'Cyberpunk Red Generator', link: 'https://cyberpunk-char-gen.neocities.org',
            desc: 'Great utility for Cyberpunk Red character generation.', target: '_blank'},
          {title: 'Moosh Cyberpunk Generator', link: 'https://www.moosh.net/cp2020/', desc: 'Cooll little utiltiies', target: '_blank'},
          {title: 'Dodo Cyberpunk Generator', link: 'http://members.dodo.com.au/~boyleholdings/cyberpunk/#4thPage',
            desc: 'Another site for chracter genartion.', target: '_blank'},
          {title: 'Laurel Cadre Goon Generator', link: 'http://www.laurelcadre.com/cp_goon/',
            desc: 'Nice way of craete quick NPCs for the game.', target: '_blank'},
          {title: 'Cyberpunk Uncensored', link: 'https://www.cyberpunkuncensored.com/',
              desc: 'New site to the scene. Rob Mulligan from Mulligan Live is pushing the game to the masses.', target: '_blank'},
          {title: 'Datapool 2045',
              link: 'https://datapool2045.net/',
                    desc: 'Cool site with links to help guide edgerunners to things Cyberpunk', target: '_blank'},
          {title: 'SkethcFab NC map',
          link: 'https://sketchfab.com/3d-models/night-city-2020-schematic-map-7ba41a4a19574bb38bf744d7017df48c',
                desc: 'Real nice 3d map of Night City.', target: '_blank'}
        ]
      });
      this.menuItems.push({
        groupTitle: 'Vids',
        description: 'Under Vids you will find links to videos, webisodes, and streams for Cyberpunk 2020/Red.',
        links: [
          {title: 'Cyberpunk Uncensored',
        link: 'https://www.youtube.com/channel/UClWubbkZ7eONxjD9f98mGjg',
        desc: 'Liveplay, advice, reviews', target: '_blank'},
          {title: 'The Dark Future', link: 'https://www.youtube.com/channel/UCdppRwWMT7V7hfqI4ZncZBg', desc: '', target: '_blank'},
          {title: 'Die Party Nightcity',
            link: 'https://www.youtube.com/watch?v=_nU7Ihi_wDs&list=PL6hA9KBc10-6nIi7s6y-GdIcvRBYvZNIN',
            desc: 'One of the first liveplays for Cyberpunk.', target: '_blank'},
          {title: 'HSG Cyberpujnk 2020',
            link: 'https://www.youtube.com/watch?v=u2YNS-IHmvM&list=PLW2YGZCblxbdtK-CP0zETLS1Uq15XiUBU',
            desc: 'Liveplay', target: '_blank'},
          {title: 'Hokie200proof Cyberpunk',
            link: 'https://www.youtube.com/watch?v=utbv55gCjW4&list=PLMeyxv3x0N0tPan0m-l8KeL3hp8UBGohv',
            desc: 'Liveplay', target: '_blank'},
          {title: 'JonJon theWise', link: 'https://www.youtube.com/channel/UCTZML8xYXTyuEaCb9ette6Q',
            desc: 'Great discussion and explanation as well as live play.', target: '_blank'},
          {title: 'Mad Queen Show', link: 'https://www.youtube.com/channel/UC0G5rpOFcY6pOdtKsCE0p2A',
            desc: 'Lore Galore. Mostly concentration on CP 2077', target: '_blank'},
          {title: 'Mr Welch', link: 'https://www.youtube.com/channel/UC3NteHN3fWXXMaLXjMMHRkA',
            desc: 'Reviews of Cyberpunk supplements', target: '_blank'},
          {title: 'PunkGenerator', link: 'https://www.youtube.com/channel/UCrB_VVl4kFsMiQFw_h6RKfg',
            desc: 'Reviews and live play.', target: '_blank'},
          {title: 'Seth Skorkowsky', link: 'https://www.youtube.com/channel/UCQs8-UJ7IHsrzhQ-OQOYBmg',
            desc: 'Great advise for all TTRPGs, but has a few specifically for Cyberpunk', target: '_blank'},
          {title: 'Tabletop Cyberpujnk 2020',
            link: 'https://www.youtube.com/watch?v=efRE_tqUkhY&list=PLr8mrSTjqGo6-A9QBncTWvj96GKALCfae',
            desc: 'Liveplay. If not the first, definitely one of the earliest.', target: '_blank'},
          {title: 'Tokyo Red: Cyberpunk Red',
            link: 'https://www.youtube.com/playlist?list=PLM-HN-1Cf8rggbs5RiHn-OkUjncMTAzYE',
            desc: 'Liveplay', target: '_blank'}
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
