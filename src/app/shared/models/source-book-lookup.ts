export class SourceBookLookup {
    static getSource(abbrev: string): string {
      if ( abbrev.startsWith('CP')) {
        return 'Cyberpunk 2020 2nd ed.';
      }
        switch (abbrev) {
            case 'Chr1':
              return 'Chromebook 1';
            case 'Chr2':
              return 'Chromebook 2';
            case 'Chr3':
              return 'Chromebook 3';
            case 'Chr4':
              return 'Chromebook 4';
            case 'BH':
              return 'Blackhand\'s Street Weapons';
            case 'LD':
              return 'Live & Direct';
            case 'WS':
              return 'Wildside';
            case 'NEO':
              return 'Neo Tribes';
            case 'SOF':
              return 'Solo of Fortune';
            case 'SOF2':
              return 'Solo of Fortune 2';
            case 'HW':
              return 'Hardwired';
            case 'LU':
              return 'Listen Up, You Primitive Screwheads!!!';
            case 'PS':
              return 'Protect & Serve';
            case 'WGF':
              return 'When Gravity Fails';
            case 'DS':
              return 'Deep Space';
            case 'PAC':
              return 'Pacific Rim Sourcebook';
            case 'MM':
              return 'Maximum Metal';
            case 'HOB':
              return 'Home of the Brave';
            case 'SF':
              return 'Firestorm: Stormfront';
            case 'SW':
              return 'Firestorm: Shockwave';
            case 'CB1':
              return 'Corpbook 1';
            case 'CB2':
              return 'Corpbook 2';
            case 'CB3':
              return 'Corpbook 3';
            case 'ES+':
              return 'Eurosource Plus';
            case 'RB':
              return 'Rockerboy';
            case 'NC':
              return 'Night City';
            case 'BB':
              return 'R Bartmoss\' Brainware Blowout';
            case 'NET':
              return 'Rache Bartmoss\' Guide to the Net';
            case 'UK':
              return 'Rough Guide to the U.K.';
            case 'I1.1':
              return 'Interface 1.1';
            case 'I1.2':
              return 'Interface 1.2';
            case 'I1.3':
              return 'Interface 1.3';
            case 'I1.4':
              return 'Interface 1.4';
            case 'I2.1':
              return 'Interface 2.1';
            case 'I2.2':
              return 'Interface 2.2';
            case 'LOF':
              return 'Land of the Free';
            case 'ET':
              return 'Eurotour';
            case 'ER':
              return 'Edgerunner Inc.';
            case 'FH':
              return 'Forlorn Hope';
            default:
                return '??';
        }
    }

    static getAbbrev(name: string): string {
      if (RegExp(/cyberpunk.*2020.*/gi).test(name)) {
        return 'CP2020';
      }
      if (RegExp(/chrome.*book.*1/gi).test(name)) {
        return 'Chr1';
      }
      if (RegExp(/chrome.*book.*2/gi).test(name)) {
        return 'Chr2';
      }
      if (RegExp(/chrome.*book.*3/gi).test(name)) {
        return 'Chr3';
      }
      if (RegExp(/chrome.*book.*4/gi).test(name)) {
        return 'Chr4';
      }
      if (RegExp(/blackhand.*/gi).test(name)) {
        return 'BH';
      }
      if (RegExp(/live.*[\&'and'].*direct/gi).test(name)) {
        return 'LD';
      }
      if (RegExp(/wild*.side.*/gi).test(name)) {
        return 'WS';
      }
      if (RegExp(/neo*.tribe.*/gi).test(name)) {
        return 'NEO';
      }
      if (RegExp(/solo.*2*./gi).test(name)) {
        return 'SOF2';
      }
      if (RegExp(/solo.*/gi).test(name)) {
        return 'SOF';
      }
      if (RegExp(/hard.*wire.*/gi).test(name)) {
        return 'HW';
      }
      if (RegExp(/listen.*/gi).test(name)) {
        return 'LU';
      }
      if (RegExp(/protect.*[\&'and']*.serve.*/gi).test(name)) {
        return 'PS';
      }
      if (RegExp(/when.*gravity.*/gi).test(name)) {
        return 'WGF';
      }
      if (RegExp(/deep.*space.*/gi).test(name)) {
        return 'DS';
      }
      if (RegExp(/Pac.*rim.*/gi).test(name)) {
        return 'PAC';
      }
      if (RegExp(/max.*metal.*/gi).test(name)) {
        return 'MM';
      }
      if (RegExp(/home.*brave.*/gi).test(name)) {
        return 'HOB';
      }
      if (RegExp(/['firestorm'].*stormfront.*/gi).test(name)) {
        return 'SF';
      }
      if (RegExp(/['firestorm'].*shockwave.*/gi).test(name)) {
        return 'SW';
      }
      if (RegExp(/corp.*book.*1/gi).test(name)) {
        return 'CB1';
      }
      if (RegExp(/corp.*book.*2/gi).test(name)) {
        return 'CB2';
      }
      if (RegExp(/corp.*book.*3/gi).test(name)) {
        return 'CB3';
      }
      if (RegExp(/euro.*source.*[\+'plus'].*/gi).test(name)) {
        return 'ES+';
      }
      if (RegExp(/euro.*source.*/gi).test(name)) {
        return 'ES';
      }
      if (RegExp(/rocker.*boy.*/gi).test(name)) {
        return 'RB';
      }
      if (RegExp(/night.*city.*/gi).test(name)) {
        return 'NC';
      }
      if (RegExp(/.*brain[ware]*.*blowout.*/gi).test(name)) {
        return 'BB';
      }
      if (RegExp(/.*guide.*net.*/gi).test(name)) {
        return 'NET';
      }
      if (RegExp(/.*guide.*u*.k.*/gi).test(name)) {
        return 'UK';
      }
      if (RegExp(/interface.*\d+\.\d+/gi).test(name)) {
        return name.replace(/interface.*(\d+\.\d+)/gi, 'I$1');
      }
      if (RegExp(/land.*free.*/gi).test(name)) {
        return 'LOF';
      }
      if (RegExp(/euro.*tour.*/gi).test(name)) {
        return 'ET';
      }
      if (RegExp(/edgerunn.*/gi).test(name)) {
        return 'ER';
      }
      if (RegExp(/forlorn.*hope.*/gi).test(name)) {
        return 'FH';
      }
      return '??';
    }
}
