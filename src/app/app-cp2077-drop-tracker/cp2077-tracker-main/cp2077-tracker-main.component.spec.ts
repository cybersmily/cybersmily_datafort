import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2077TrackerMainComponent } from './cp2077-tracker-main.component';

describe('Cp2077TrackerMainComponent', () => {
  let component: Cp2077TrackerMainComponent;
  let fixture: ComponentFixture<Cp2077TrackerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2077TrackerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2077TrackerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
