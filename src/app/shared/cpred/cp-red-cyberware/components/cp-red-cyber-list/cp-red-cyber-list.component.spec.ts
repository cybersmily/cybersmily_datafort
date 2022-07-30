import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCyberListComponent } from './cp-red-cyber-list.component';

describe('CpRedCyberListComponent', () => {
  let component: CpRedCyberListComponent;
  let fixture: ComponentFixture<CpRedCyberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCyberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCyberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
