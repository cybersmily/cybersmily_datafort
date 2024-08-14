import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzArmyListComponent } from './cr-cz-army-list.component';

describe('CrCzArmyListComponent', () => {
  let component: CrCzArmyListComponent;
  let fixture: ComponentFixture<CrCzArmyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzArmyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzArmyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
