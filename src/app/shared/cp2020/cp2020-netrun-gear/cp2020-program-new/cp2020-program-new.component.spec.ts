import { Cp2020Program, ProgramOption } from '../models';
import { of } from 'rxjs';
import { DataService } from '../../../services/file-services';
import { NrProgramOptionsService } from '../../../services/netrun/nr-program-options.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from '../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020ProgramNewComponent } from './cp2020-program-new.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProgramNewComponent', () => {
  let component: Cp2020ProgramNewComponent;
  let fixture: ComponentFixture<Cp2020ProgramNewComponent>;
  let nrProgramOptionsService: NrProgramOptionsService;
  let dataService: DataService;
  let options: Array<ProgramOption>;
  let classes: Array<ProgramOption>;
  let programList: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [Cp2020ProgramNewComponent],
    imports: [CommonUiModule],
    providers: [
        NrProgramOptionsService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ProgramNewComponent);
    nrProgramOptionsService = TestBed.inject(NrProgramOptionsService);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;

    options = new Array<ProgramOption>();
    options.push({name: 'a', diff: 1, description: 'testing'});
    options.push({name: 'b', diff: 1, description: 'testing'});
    options.push({name: 'a', diff: 1, description: 'testing'});

    classes = new Array<ProgramOption>();
    classes.push({name: 'a', diff: 1, description: 'testing'});
    classes.push({name: 'b', diff: 1, description: 'testing'});
    classes.push({name: 'a', diff: 1, description: 'testing'});

    programList = { programs: new Array<Cp2020Program>() };
    programList.programs.push(new Cp2020Program({name: 'prog1', description: '', icon: '', class: {}, options: new Array<ProgramOption>(), loaded: true, _str: 1}));
    programList.programs.push(new Cp2020Program({name: 'prog2', description: '', icon: '', class: {}, options: new Array<ProgramOption>(), loaded: true, _str: 1}));
    programList.programs.push(new Cp2020Program({name: 'prog3', description: '', icon: '', class: {}, options: new Array<ProgramOption>(), loaded: true, _str: 1}));

    spyOnProperty(nrProgramOptionsService, 'classes', 'get').and.returnValue(of(classes));
    spyOnProperty(nrProgramOptionsService, 'options', 'get').and.returnValue(of(options));
    spyOn(dataService, 'GetJson').and.returnValue(of(programList));

    fixture.detectChanges();
  });

  describe('create component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.options.length).toEqual(options.length);
      expect(component.classes.length).toEqual(classes.length);
      //expect(component.programList.length).toEqual(programList.programs.length);
    });
  });

  describe('properties', () => {
    it('should get optionList as a string', () => {
      expect(typeof component.optionList).toEqual('string');
    });
  });

  describe('updated()', () => {
    it('should update', () => {
      component.updated();
      expect(component.isSaved).toBeFalse();
    });
  });

  describe('save()', () => {
    it('should save', () => {
      component.updated();
      component.save();
      expect(component.isSaved).toBeTruthy();
    });
  });


  describe('checkOption', () => {
    it('should not check options for out of bounds index', () => {
      component.checkOption(-1);
      component.checkOption(options.length);
      expect(component.program.options.length).toEqual(0);
    });

    it('should check option add to program options', () => {
      component.checkOption(0);
      expect(component.program.options.length).toEqual(1);
      expect(component.program.options[0].name).toEqual(options[0].name);
      expect(component.program.description.includes('testing')).toBeTrue();
    });

    it('should check option add/remove to program options', () => {
      component.checkOption(0);
      expect(component.program.options.length).toEqual(1);
      expect(component.program.options[0].name).toEqual(options[0].name);
      expect(component.program.description.includes('testing')).toBeTrue();
      component.checkOption(0);
      expect(component.program.options.length).toEqual(0);
      expect(component.program.description.includes('testing')).toBeFalse();
    });
  });

  describe('isChecked()', () => {
    it('should option be checked', () => {
      component.checkOption(0);
      expect(component.isChecked('a')).toBeTrue();
      expect(component.isChecked('testing')).toBeFalse();
    });
  });

  describe('compare()', () => {
    it('should compare NrProgramOption', () => {
      const optionA:ProgramOption = {name: 'a', diff: 1, description: ''};
      const optionB:ProgramOption = {name: 'b', diff: 1, description: ''};
      const optionC:ProgramOption = {name: 'a', diff: 1, description: ''};
      expect(component.compare(optionA, optionC)).toBeTruthy();
      expect(component.compare(optionA, optionB)).toBeFalse();
    });
  });

  describe('addProgram()', () => {
    it('should add a program with lookup class and option', () => {
      expect(component.program.name).toEqual('');
      const prog = { name: 'test 1',
                  class: 'a',
                  options: ['b']
                };
      component.addProgram(prog);
      expect(component.program.name).toEqual(prog.name);
      expect(component.program.class.name).toEqual(prog.class);
      expect(component.program.options.length).toEqual(1);
    });

    it('should add a program without lookup class and option', () => {
      expect(component.program.name).toEqual('');
      const prog = { name: 'test 1',
      class: 'd',
      options: ['d']
    };
      component.addProgram(prog);
      expect(component.program.name).toEqual(prog.name);
      expect(component.program.class.name).toEqual(prog.class);
      expect(component.program.options.length).toEqual(0);
    });
  });
});
