import { DataService } from './../../../services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponOptionsComponent } from './cp2020weapon-options.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020weaponOptionsComponent', () => {
  let component: Cp2020weaponOptionsComponent;
  let fixture: ComponentFixture<Cp2020weaponOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020weaponOptionsComponent],
    imports: [CommonUiModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
