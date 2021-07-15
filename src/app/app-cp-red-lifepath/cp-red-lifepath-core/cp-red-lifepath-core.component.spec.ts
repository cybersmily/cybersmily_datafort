import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathCoreComponent } from './cp-red-lifepath-core.component';

describe('CpRedLifepathCoreComponent', () => {
  let component: CpRedLifepathCoreComponent;
  let fixture: ComponentFixture<CpRedLifepathCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
