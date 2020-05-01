import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionListComponent } from './fashion-list.component';

describe('FashionListComponent', () => {
  let component: FashionListComponent;
  let fixture: ComponentFixture<FashionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
