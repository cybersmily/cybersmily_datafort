import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubGeneratorMainComponent } from './club-generator-main.component';

describe('ClubGeneratorMainComponent', () => {
  let component: ClubGeneratorMainComponent;
  let fixture: ComponentFixture<ClubGeneratorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubGeneratorMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubGeneratorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
