import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorSectionComponent } from './cp2020-armor-section.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020ArmorSectionComponent', () => {
  let component: Cp2020ArmorSectionComponent;
  let fixture: ComponentFixture<Cp2020ArmorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020ArmorSectionComponent],
    imports: [CommonUiModule,
        BrowserAnimationsModule],
    providers: [
        BsModalService,
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
