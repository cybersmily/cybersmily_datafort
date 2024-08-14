import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzProgramListComponent } from './cr-cz-program-list.component';

describe('CrCzProgramListComponent', () => {
  let component: CrCzProgramListComponent;
  let fixture: ComponentFixture<CrCzProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzProgramListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
