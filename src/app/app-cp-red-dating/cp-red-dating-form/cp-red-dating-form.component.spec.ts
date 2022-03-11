import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedDatingFormComponent } from './cp-red-dating-form.component';

describe('CpRedDatingFormComponent', () => {
  let component: CpRedDatingFormComponent;
  let fixture: ComponentFixture<CpRedDatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedDatingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedDatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
