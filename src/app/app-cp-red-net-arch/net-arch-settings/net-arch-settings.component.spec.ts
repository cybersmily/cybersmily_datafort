import { ColorEvent } from 'ngx-color';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchSettingsComponent } from './net-arch-settings.component';
import { CPRedIconTypeSettings } from '../models';

describe('NetArchSettingsComponent', () => {
  let component: NetArchSettingsComponent;
  let fixture: ComponentFixture<NetArchSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetArchSettingsComponent],
      imports: [
        CommonUiModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Changes to selectedColor', () => {
    it('should change color from event', () => {
      expect(component.selectedColor).toEqual('');
      const cEvent: ColorEvent = {
        $event: null,
        color: {
          hex: '#000000',
          rgb: { a: 1.0, b: 0.0, g: 0.0, r: 0.0 },
          source: '',
          oldHue: 1.0,
          hsl: { a: 1.0, h: 1.0, s: 1.0, l: 1.0 },
          hsv: { a: 1.0, h: 1.0, s: 1.0, v: 1.0 }
        }
      };
      component.changeColor(cEvent);
      expect(component.selectedColor).toEqual(cEvent.color.hex);
    });

    it('should change color from event', () => {
      expect(component.selectedColor).toEqual('');
      component.setSelectedColor('#000000');
      expect(component.selectedColor).toEqual('#000000');
    });
  });

  describe('setColor()', () => {
    let testColor = '#848484';
    let iconColors = new CPRedIconTypeSettings();

    beforeEach(() => {
      component.selectedColor = testColor;
      component.iconColors = new CPRedIconTypeSettings();
    });

    it('should change color for Program', () => {
      expect(component.iconColors.program.color).toEqual(iconColors.program.color);
      component.setColor('Program');
      fixture.detectChanges();
      expect(component.iconColors.program.color).toEqual(testColor);
    });

    it('should change color for File', () => {
      expect(component.iconColors.file.color).toEqual(iconColors.file.color);
      component.setColor('File');
      fixture.detectChanges();
      expect(component.iconColors.file.color).toEqual(testColor);
    });

    it('should change color for Controller Node', () => {
      expect(component.iconColors.controlNode.color).toEqual(iconColors.controlNode.color);
      component.setColor('Controller Node');
      fixture.detectChanges();
      expect(component.iconColors.controlNode.color).toEqual(testColor);
    });

    it('should change color for Password', () => {
      expect(component.iconColors.password.color).toEqual(iconColors.password.color);
      component.setColor('Password');
      fixture.detectChanges();
      expect(component.iconColors.password.color).toEqual(testColor);
    });

    it('should change color for background', () => {
      expect(component.iconColors.background).toEqual(iconColors.background);
      component.setColor('background');
      fixture.detectChanges();
      expect(component.iconColors.background).toEqual(testColor);
    });


    it('should change color for foreground', () => {
      expect(component.iconColors.foreground).toEqual(iconColors.foreground);
      component.setColor('foreground');
      fixture.detectChanges();
      expect(component.iconColors.foreground).toEqual(testColor);
    });

    it('should change color for border', () => {
      expect(component.iconColors.border).toEqual(iconColors.border);
      component.setColor('border');
      fixture.detectChanges();
      expect(component.iconColors.border).toEqual(testColor);
    });
  });

  describe('resetColor()', () => {
    let testColor = '#848484';
    let iconColors = new CPRedIconTypeSettings();

    beforeEach(() => {
      component.selectedColor = testColor;
      component.iconColors = new CPRedIconTypeSettings();
      component.setColor('Password');
      component.setColor('Program');
      component.setColor('File');
      component.setColor('Controller Node');
      fixture.detectChanges();
    });

    it('should change color for Program', () => {
      expect(component.iconColors.program.color).toEqual(testColor);
      component.resetColor('Program');
      expect(component.iconColors.program.color).toEqual(iconColors.program.color);
    });

    it('should change color for File', () => {
      expect(component.iconColors.file.color).toEqual(testColor);
      component.resetColor('File');
      expect(component.iconColors.file.color).toEqual(iconColors.file.color);
    });

    it('should change color for Controller Node', () => {
      expect(component.iconColors.controlNode.color).toEqual(testColor);
      component.resetColor('Controller Node');
      expect(component.iconColors.controlNode.color).toEqual(iconColors.controlNode.color);
    });

    it('should change color for Password', () => {
      expect(component.iconColors.password.color).toEqual(testColor);
      component.resetColor('Password');
      expect(component.iconColors.password.color).toEqual(iconColors.password.color);
    });
  });

  describe('setBgColor()', () => {
    let testColor = '#848484';
    let iconColors = new CPRedIconTypeSettings();

    beforeEach(() => {
      component.selectedColor = testColor;
      component.iconColors = new CPRedIconTypeSettings();
    });

    it('should change color for Program', () => {
      expect(component.iconColors.program.bgColor).toEqual(iconColors.program.bgColor);
      component.setBgColor('Program');
      fixture.detectChanges();
      expect(component.iconColors.program.bgColor).toEqual(testColor);
    });

    it('should change color for File', () => {
      expect(component.iconColors.file.bgColor).toEqual(iconColors.file.bgColor);
      component.setBgColor('File');
      fixture.detectChanges();
      expect(component.iconColors.file.bgColor).toEqual(testColor);
    });

    it('should change color for Controller Node', () => {
      expect(component.iconColors.controlNode.bgColor).toEqual(iconColors.controlNode.bgColor);
      component.setBgColor('Controller Node');
      fixture.detectChanges();
      expect(component.iconColors.controlNode.bgColor).toEqual(testColor);
    });

    it('should change color for Password', () => {
      expect(component.iconColors.password.bgColor).toEqual(iconColors.password.bgColor);
      component.setBgColor('Password');
      fixture.detectChanges();
      expect(component.iconColors.password.bgColor).toEqual(testColor);
    });

    it('should not change color for background', () => {
      expect(component.iconColors.background).toEqual(iconColors.background);
      component.setBgColor('background');
      fixture.detectChanges();
      expect(component.iconColors.background).toEqual(iconColors.background);
    });
  });

  describe('resetBgColor()', () => {
    let testColor = '#848484';
    let iconColors = new CPRedIconTypeSettings();

    beforeEach(() => {
      component.selectedColor = testColor;
      component.iconColors = new CPRedIconTypeSettings();
      component.setBgColor('Password');
      component.setBgColor('Program');
      component.setBgColor('File');
      component.setBgColor('Controller Node');
      fixture.detectChanges();
    });

    it('should change color for Program', () => {
      expect(component.iconColors.program.bgColor).toEqual(testColor);
      component.resetBgColor('','Program');
      fixture.detectChanges();
      expect(component.iconColors.program.bgColor).toEqual(iconColors.program.bgColor);
    });

    it('should change color for File', () => {
      expect(component.iconColors.file.bgColor).toEqual(testColor);
      component.resetBgColor('','File');
      fixture.detectChanges();
      expect(component.iconColors.file.bgColor).toEqual(iconColors.file.bgColor);
    });

    it('should change color for Controller Node', () => {
      expect(component.iconColors.controlNode.bgColor).toEqual(testColor);
      component.resetBgColor('','Controller Node');
      fixture.detectChanges();
      expect(component.iconColors.controlNode.bgColor).toEqual(iconColors.controlNode.bgColor);
    });

    it('should change color for Password', () => {
      expect(component.iconColors.password.bgColor).toEqual(testColor);
      component.resetBgColor('','Password');
      fixture.detectChanges();
      expect(component.iconColors.password.bgColor).toEqual(iconColors.password.bgColor);
    });
  });



});
