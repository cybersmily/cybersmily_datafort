export class SourceBookLookup {
    static getSource(abbrev: string): string {
        switch (abbrev) {
            case 'CP':
            case 'CP20':
            case 'CP2020':
              return 'Cyberpunk 2020 2nd ed.';
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
}
