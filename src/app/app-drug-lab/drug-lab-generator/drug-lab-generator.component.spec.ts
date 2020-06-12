import { RxLabDataService } from './../../shared/services/rxlab/rx-lab-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugLabGeneratorComponent } from './drug-lab-generator.component';

describe('DrugLabGeneratorComponent', () => {
  let component: DrugLabGeneratorComponent;
  let fixture: ComponentFixture<DrugLabGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugLabGeneratorComponent ],
      imports: [ HttpClientTestingModule],
      providers: [ RxLabDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugLabGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
