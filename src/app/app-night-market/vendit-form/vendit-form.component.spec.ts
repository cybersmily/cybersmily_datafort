import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditFormComponent } from './vendit-form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VenditFormComponent', () => {
  let component: VenditFormComponent;
  let fixture: ComponentFixture<VenditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [VenditFormComponent],
    imports: [CommonUiModule],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
