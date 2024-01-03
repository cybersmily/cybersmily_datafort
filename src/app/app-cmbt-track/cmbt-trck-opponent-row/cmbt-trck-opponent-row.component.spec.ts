import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckOpponentRowComponent } from './cmbt-trck-opponent-row.component';

describe('CmbtTrckOpponentRowComponent', () => {
  let component: CmbtTrckOpponentRowComponent;
  let fixture: ComponentFixture<CmbtTrckOpponentRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmbtTrckOpponentRowComponent]
    });
    fixture = TestBed.createComponent(CmbtTrckOpponentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
