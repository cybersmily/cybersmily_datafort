import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckStatComponent } from './cmbt-trck-stat.component';

describe('CmbtTrckStatComponent', () => {
  let component: CmbtTrckStatComponent;
  let fixture: ComponentFixture<CmbtTrckStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckStatComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
