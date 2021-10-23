import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ammoComponent } from './cp2020ammo.component';

describe('Cp2020ammoComponent', () => {
  let component: Cp2020ammoComponent;
  let fixture: ComponentFixture<Cp2020ammoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ammoComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ammoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
