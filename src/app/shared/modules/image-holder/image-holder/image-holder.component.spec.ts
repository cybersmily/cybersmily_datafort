import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHolderComponent } from './image-holder.component';

describe('ImageHolderComponent', () => {
  let component: ImageHolderComponent;
  let fixture: ComponentFixture<ImageHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageHolderComponent],
      imports: [CommonUiModule, BrowserAnimationsModule],
    }).compileComponents();
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
