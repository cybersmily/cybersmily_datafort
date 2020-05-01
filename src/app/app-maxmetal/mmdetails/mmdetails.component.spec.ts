import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmdetailsComponent } from './mmdetails.component';

describe('MmdetailsComponent', () => {
  let component: MmdetailsComponent;
  let fixture: ComponentFixture<MmdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmdetailsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
