import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CPRedNetArchChartsService } from './../service/c-p-red-net-arch-charts.service';
import { DataService } from './../../shared/services/file-services';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NetArchMainComponent } from './net-arch-main.component';

describe('NetArchMainComponent', () => {
  let component: NetArchMainComponent;
  let fixture: ComponentFixture<NetArchMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [NetArchMainComponent],
    imports: [CommonUiModule],
    providers: [
        DiceService,
        DataService,
        CPRedNetArchChartsService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
