import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafortDesignerMainComponent } from './datafort-designer-main.component';

describe('DatafortDesignerMainComponent', () => {
  let component: DatafortDesignerMainComponent;
  let fixture: ComponentFixture<DatafortDesignerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatafortDesignerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafortDesignerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
