import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DiceService } from './../../../services/dice/dice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorDetailComponent } from './cp2020-armor-detail.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020ArmorDetailComponent', () => {
  let component: Cp2020ArmorDetailComponent;
  let fixture: ComponentFixture<Cp2020ArmorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020ArmorDetailComponent],
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
    fixture = TestBed.createComponent(Cp2020ArmorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
