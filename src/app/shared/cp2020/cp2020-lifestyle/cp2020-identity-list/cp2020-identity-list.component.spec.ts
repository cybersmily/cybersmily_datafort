import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020IdentityListComponent } from './cp2020-identity-list.component';

describe('Cp2020IdentityListComponent', () => {
  let component: Cp2020IdentityListComponent;
  let fixture: ComponentFixture<Cp2020IdentityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020IdentityListComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020IdentityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
