import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSettingsComponent } from './armor-settings.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArmorSettingsComponent', () => {
  let component: ArmorSettingsComponent;
  let fixture: ComponentFixture<ArmorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ArmorSettingsComponent],
    imports: [],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
