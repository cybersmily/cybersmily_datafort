import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzSquadFormComponent } from './cr-cz-squad-form.component';

describe('CrCzSquadFormComponent', () => {
  let component: CrCzSquadFormComponent;
  let fixture: ComponentFixture<CrCzSquadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzSquadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzSquadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
