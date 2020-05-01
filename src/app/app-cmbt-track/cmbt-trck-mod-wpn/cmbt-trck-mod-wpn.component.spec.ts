import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckModWpnComponent } from './cmbt-trck-mod-wpn.component';

describe('CmbtTrckModWpnComponent', () => {
  let component: CmbtTrckModWpnComponent;
  let fixture: ComponentFixture<CmbtTrckModWpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckModWpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckModWpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
