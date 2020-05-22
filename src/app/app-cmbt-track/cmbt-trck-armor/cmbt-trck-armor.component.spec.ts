import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckArmorComponent } from './cmbt-trck-armor.component';

describe('CmbtTrckArmorComponent', () => {
  let component: CmbtTrckArmorComponent;
  let fixture: ComponentFixture<CmbtTrckArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
