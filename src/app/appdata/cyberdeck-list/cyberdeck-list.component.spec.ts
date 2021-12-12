import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberdeckListComponent } from './cyberdeck-list.component';

describe('CyberdeckListComponent', () => {
  let component: CyberdeckListComponent;
  let fixture: ComponentFixture<CyberdeckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberdeckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberdeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
