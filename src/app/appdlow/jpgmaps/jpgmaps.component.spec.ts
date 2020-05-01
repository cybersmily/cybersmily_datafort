import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JpgmapsComponent } from './jpgmaps.component';

describe('JpgmapsComponent', () => {
  let component: JpgmapsComponent;
  let fixture: ComponentFixture<JpgmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JpgmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JpgmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
