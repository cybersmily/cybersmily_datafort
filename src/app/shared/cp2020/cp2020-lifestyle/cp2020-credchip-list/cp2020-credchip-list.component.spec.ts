import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CredchipListComponent } from './cp2020-credchip-list.component';

describe('Cp2020CredchipListComponent', () => {
  let component: Cp2020CredchipListComponent;
  let fixture: ComponentFixture<Cp2020CredchipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020CredchipListComponent ],
      imports: [CommonUiModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CredchipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
