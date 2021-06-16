import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtZoneFormComponent } from './cmbt-zone-form.component';

describe('CmbtZoneFormComponent', () => {
  let component: CmbtZoneFormComponent;
  let fixture: ComponentFixture<CmbtZoneFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtZoneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtZoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
