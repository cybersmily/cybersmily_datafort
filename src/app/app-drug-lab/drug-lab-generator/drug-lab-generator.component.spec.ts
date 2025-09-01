import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { RxLabDataService } from './../../shared/services/rxlab/rx-lab-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrugLabGeneratorComponent } from './drug-lab-generator.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DrugLabGeneratorComponent', () => {
  let component: DrugLabGeneratorComponent;
  let fixture: ComponentFixture<DrugLabGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DrugLabGeneratorComponent],
    imports: [CommonUiModule],
    providers: [RxLabDataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugLabGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
