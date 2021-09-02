import { of } from 'rxjs';
import { SaveFileService } from './../../shared/services/file-services/save-file.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2077TrackerMainComponent } from './cp2077-tracker-main.component';

describe('Cp2077TrackerMainComponent', () => {
  let component: Cp2077TrackerMainComponent;
  let fixture: ComponentFixture<Cp2077TrackerMainComponent>;
  let dataService: DataService;
  let fileService: SaveFileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2077TrackerMainComponent],
      imports: [CommonUiModule,
        HttpClientTestingModule,
        PipesModule
      ],
      providers: [DataService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2077TrackerMainComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    fileService = fixture.debugElement.injector.get(SaveFileService);
    spyOn(dataService, 'GetJson').and.returnValue(of(
      {
        kills: {
          sixthstreet: 275,
          animals: 100,
          maelstrom: 116,
          scav: 261,
          tygerclaw: 333,
          valentinos: 202,
          voodooboys: 50,
          wraiths: 100,
          arasaka: 10,
          militech: 10,
          kangtao: 10,
          merc: 16,
          netwatch: 10
        },
        items: [
          {
            location: 0,
            name: 'Arasaka Hazmat Suit',
            cm: 'B',
            cf: '?',
            nm: '',
            sf: 'P',
            sm: '-',
            nf: 'B',
            sixthstreet: 0,
            animals: 0,
            maelstrom: 0,
            scav: 0,
            tygerclaw: 0,
            valentinos: 1,
            voodooboys: 0,
            wraiths: 0,
            arasaka: 0,
            militech: 0,
            kangtao: 0,
            merc: 0,
            netwatch: 0,
            container: 2,
            quest: 0,
            rancho: 0,
            arroyo: 1,
            pacifica: 0,
            badlands: 0,
            kabuki: 0,
            littlechina: 0,
            northside: 0,
            japantown: 0,
            charterhill: 0,
            wellsprings: 0,
            theglens: 0,
            citycenter: 0
          },
          {
            location: 1,
            name: 'missingItem',
            cm: '',
            cf: '',
            nm: '',
            sf: '',
            sm: '',
            nf: '',
            sixthstreet: 0,
            animals: 0,
            maelstrom: 0,
            scav: 0,
            tygerclaw: 0,
            valentinos: 0,
            voodooboys: 0,
            wraiths: 0,
            arasaka: 0,
            militech: 0,
            kangtao: 0,
            merc: 0,
            netwatch: 0,
            container: 0,
            quest: 0,
            rancho: 0,
            arroyo: 0,
            pacifica: 0,
            badlands: 0,
            kabuki: 0,
            littlechina: 0,
            northside: 0,
            japantown: 0,
            charterhill: 0,
            wellsprings: 0,
            theglens: 0,
            citycenter: 0
          },
          {
            location: 2,
            name: 'streetkid female Item',
            cm: '',
            cf: '',
            nm: '',
            sf: 'B',
            sm: '',
            nf: '',
            sixthstreet: 0,
            animals: 0,
            maelstrom: 0,
            scav: 0,
            tygerclaw: 0,
            valentinos: 0,
            voodooboys: 0,
            wraiths: 0,
            arasaka: 0,
            militech: 0,
            kangtao: 0,
            merc: 0,
            netwatch: 0,
            container: 0,
            quest: 0,
            rancho: 0,
            arroyo: 0,
            pacifica: 0,
            badlands: 0,
            kabuki: 0,
            littlechina: 0,
            northside: 0,
            japantown: 0,
            charterhill: 0,
            wellsprings: 0,
            theglens: 0,
            citycenter: 0
          }
        ]
      }
    ));

    fixture.detectChanges();
  });

  describe('Create Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize', () => {
      component.ngOnInit();
      fixture.autoDetectChanges();
      expect(component.data.length).toBeGreaterThan(0);
    });
  });

  describe('Properties', () => {
    it('should currCount be set for V', () => {
      component.selectedCharacter = 'cm';
      expect(component.currCount).toEqual(1);
      component.selectedCharacter = 'cf';
      expect(component.currCount).toEqual(1);
      component.selectedCharacter = 'nm';
      expect(component.currCount).toEqual(0);
      component.selectedCharacter = 'nf';
      expect(component.currCount).toEqual(1);
      component.selectedCharacter = 'sm';
      expect(component.currCount).toEqual(1);
      component.selectedCharacter = 'sf';
      expect(component.currCount).toEqual(2);
    });

    it('should totalItemsCollected be 2', () => {
      expect(component.totalItemsCollected).toEqual(2);
    });

    it('should get location arrays', () => {
      expect(component.footWear.length).toEqual(0);
      expect(component.leggings.length).toEqual(0);
      expect(component.innerTorso.length).toEqual(0);
      expect(component.outerTorso.length).toEqual(0);
      expect(component.face.length).toEqual(1);
      expect(component.head.length).toEqual(1);
      expect(component.fullbody.length).toEqual(1);
      expect(component.misc.length).toEqual(0);
    });

    it('should get missing items', () => {
      component.selectedCharacter = 'sf';
      expect(component.missing.length).toEqual(1);
      component.selectedCharacter = 'nm';
      expect(component.missing.length).toEqual(3);
      component.selectedCharacter = 'nf';
      expect(component.missing.length).toEqual(2);
    });

    it('should get total missing items', () => {
      expect(component.totalMissing.length).toEqual(1);
      expect(component.totalMissing[0].name).toEqual('missingItem');
    });

    it('should get unknown items', () => {
      component.selectedCharacter = 'cf';
      expect(component.unknown.length).toEqual(1);
      expect(component.unknown[0].name).toEqual('Arasaka Hazmat Suit');
      component.selectedCharacter = 'sf';
      expect(component.unknown.length).toEqual(0);
    });

    it('should get sex sepcfic items', () => {
      component.selectedCharacter = 'sm';
      expect(component.sex.length).toEqual(1);
      expect(component.sex[0].name).toEqual('Arasaka Hazmat Suit');
      component.selectedCharacter = 'sf';
      expect(component.sex.length).toEqual(0);
    });
  });

  describe('getLocation()', () => {
    it('should return Suit', () => {
      expect(component.getLocation(0)).toEqual('Suit');
    });
    it('should return Head', () => {
      expect(component.getLocation(1)).toEqual('Head');
    });
    it('should return Face', () => {
      expect(component.getLocation(2)).toEqual('Face');
    });
    it('should return Outer Torso', () => {
      expect(component.getLocation(3)).toEqual('Outer Torso');
    });
    it('should return Inner Torso', () => {
      expect(component.getLocation(4)).toEqual('Inner Torso');
    });
    it('should return Legs', () => {
      expect(component.getLocation(5)).toEqual('Legs');
    });
    it('should return Feet', () => {
      expect(component.getLocation(6)).toEqual('Feet');
    });
    it('should return Unknown', () => {
      expect(component.getLocation(7)).toEqual('Unknown');
      expect(component.getLocation(11)).toEqual('Unknown');
      expect(component.getLocation(-1)).toEqual('Unknown');
    });
  });

  describe('IsMissing()', () => {
    it('should have missing item', () => {
      expect(component.IsMissing('Arasaka Hazmat Suit')).toBeFalse();
      expect(component.IsMissing('missingItem')).toBeTrue();
    });
  });

  describe('onClick()', () => {
    it('should add value', () => {
      component.onClick({preventDefault: ()=>{}}, 'Arasaka Hazmat Suit', 'sixthstreet', 1);
      let data = component.data.find( itm => itm.name === 'Arasaka Hazmat Suit');
      expect(data.sixthstreet).toEqual(1);
      component.onClick({preventDefault: ()=>{}}, 'Arasaka Hazmat Suit', 'sixthstreet', -1);
      data = component.data.find( itm => itm.name === 'Arasaka Hazmat Suit');
      expect(data.sixthstreet).toEqual(0);
      component.onClick({preventDefault: ()=>{}}, 'Not Found', 'sixthstreet', 1);
      data = component.data.find( itm => itm.name === 'Not Found');
      expect(data).toBeUndefined();
    });
  });
});
