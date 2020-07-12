import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpnListComponent } from './wpn-list.component';

describe('WpnListComponent', () => {
  let component: WpnListComponent;
  let fixture: ComponentFixture<WpnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
