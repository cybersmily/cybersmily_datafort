import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services';
import { DiceService } from './../../shared/services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegasFormComponent } from './bodegas-form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BodegasFormComponent', () => {
  let component: BodegasFormComponent;
  let fixture: ComponentFixture<BodegasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [BodegasFormComponent],
    imports: [CommonUiModule],
    providers: [
        DiceService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
