import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckModSelectorComponent } from './cmbt-trck-mod-selector.component';

describe('CmbtTrckModSelectorComponent', () => {
  let component: CmbtTrckModSelectorComponent;
  let fixture: ComponentFixture<CmbtTrckModSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckModSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckModSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
