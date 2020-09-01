import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPRedLifepathFormComponent } from './c-p-red-lifepath-form.component';

describe('CPRedLifepathFormComponent', () => {
  let component: CPRedLifepathFormComponent;
  let fixture: ComponentFixture<CPRedLifepathFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPRedLifepathFormComponent ],
      providers: [
        DiceService,
        DataService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPRedLifepathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
