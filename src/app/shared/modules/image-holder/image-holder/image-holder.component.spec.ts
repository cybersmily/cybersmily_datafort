import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHolderComponent } from './image-holder.component';

describe('ImageHolderComponent', () => {
  let component: ImageHolderComponent;
  let fixture: ComponentFixture<ImageHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
