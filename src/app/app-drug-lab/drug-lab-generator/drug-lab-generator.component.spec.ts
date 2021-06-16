import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { RxLabDataService } from './../../shared/services/rxlab/rx-lab-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrugLabGeneratorComponent } from './drug-lab-generator.component';

describe('DrugLabGeneratorComponent', () => {
  let component: DrugLabGeneratorComponent;
  let fixture: ComponentFixture<DrugLabGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugLabGeneratorComponent ],
      imports: [ HttpClientTestingModule, CommonUiModule],
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
