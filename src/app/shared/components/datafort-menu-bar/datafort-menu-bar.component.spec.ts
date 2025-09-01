import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafortMenuBarComponent } from './datafort-menu-bar.component';

describe('DatafortMenuBarComponent', () => {
  let component: DatafortMenuBarComponent;
  let fixture: ComponentFixture<DatafortMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatafortMenuBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatafortMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
