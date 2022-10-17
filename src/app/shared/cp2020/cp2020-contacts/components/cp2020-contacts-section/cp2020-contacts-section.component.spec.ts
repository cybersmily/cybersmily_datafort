import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { Cp2020ContactsModule } from './../../cp2020-contacts.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ContactsSectionComponent } from './cp2020-contacts-section.component';

describe('Cp2020ContactsSectionComponent', () => {
  let component: Cp2020ContactsSectionComponent;
  let fixture: ComponentFixture<Cp2020ContactsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020ContactsSectionComponent],
      imports: [
        Cp2020ContactsModule,
        CommonUiModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(Cp2020ContactsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
