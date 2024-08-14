import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzGearListComponent } from './cr-cz-gear-list.component';

describe('CrCzGearListComponent', () => {
  let component: CrCzGearListComponent;
  let fixture: ComponentFixture<CrCzGearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzGearListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrCzGearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
