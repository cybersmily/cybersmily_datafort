import { NetRunProgram } from './../../shared/models/netrun/net-run-program';
import { NrProgramOption } from './../../shared/models/netrun/nr-program-option';
import { of } from 'rxjs';
import { DataService } from './../../shared/services/file-services/data.service';
import { NrProgramOptionsService } from './../../shared/services/netrun/nr-program-options.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramNewComponent } from './program-new.component';

describe('ProgramNewComponent', () => {
  let component: ProgramNewComponent;
  let fixture: ComponentFixture<ProgramNewComponent>;
  let nrProgramOptionsService: NrProgramOptionsService;
  let dataService: DataService;
  let options: Array<NrProgramOption>;
  let classes: Array<NrProgramOption>;
  let programList: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramNewComponent],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        NrProgramOptionsService,
        DataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramNewComponent);
    nrProgramOptionsService = TestBed.inject(NrProgramOptionsService);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;

    options = new Array<NrProgramOption>();
    options.push({name: 'a', diff: 1, description: 'testing'});
    options.push({name: 'b', diff: 1, description: 'testing'});
    options.push({name: 'a', diff: 1, description: 'testing'});

    classes = new Array<NrProgramOption>();
    classes.push({name: 'a', diff: 1, description: 'testing'});
    classes.push({name: 'b', diff: 1, description: 'testing'});
    classes.push({name: 'a', diff: 1, description: 'testing'});

    programList = { programs: new Array<NetRunProgram>() };
    programList.programs.push(new NetRunProgram({name: 'prog1', description: '', icon: '', class: {}, options: new Array<NrProgramOption>(), loaded: true, _str: 1}));
    programList.programs.push(new NetRunProgram({name: 'prog2', description: '', icon: '', class: {}, options: new Array<NrProgramOption>(), loaded: true, _str: 1}));
    programList.programs.push(new NetRunProgram({name: 'prog3', description: '', icon: '', class: {}, options: new Array<NrProgramOption>(), loaded: true, _str: 1}));

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
      expect(component.programList.length).toEqual(programList.programs.length);
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
      const optionA:NrProgramOption = {name: 'a', diff: 1, description: ''};
      const optionB:NrProgramOption = {name: 'b', diff: 1, description: ''};
      const optionC:NrProgramOption = {name: 'a', diff: 1, description: ''};
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
