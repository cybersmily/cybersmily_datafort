import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrkSpComponent } from './cmbt-trk-sp.component';

describe('CmbtTrkSpComponent', () => {
  let component: CmbtTrkSpComponent;
  let fixture: ComponentFixture<CmbtTrkSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ CmbtTrkSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrkSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
