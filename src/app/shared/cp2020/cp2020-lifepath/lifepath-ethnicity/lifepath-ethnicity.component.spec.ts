import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifepathEthnicityComponent } from './lifepath-ethnicity.component';

describe('LifepathEthnicityComponent', () => {
  let component: LifepathEthnicityComponent;
  let fixture: ComponentFixture<LifepathEthnicityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [LifepathEthnicityComponent],
    imports: [CommonUiModule],
    providers: [DataService, DiceService, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathEthnicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
