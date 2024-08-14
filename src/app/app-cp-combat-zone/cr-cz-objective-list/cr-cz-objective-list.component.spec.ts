import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzObjectiveListComponent } from './cr-cz-objective-list.component';

describe('CrCzObjectiveListComponent', () => {
  let component: CrCzObjectiveListComponent;
  let fixture: ComponentFixture<CrCzObjectiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzObjectiveListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzObjectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
