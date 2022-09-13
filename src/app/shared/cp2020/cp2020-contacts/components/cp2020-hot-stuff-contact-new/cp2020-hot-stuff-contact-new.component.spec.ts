import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HotStuffContactNewComponent } from './cp2020-hot-stuff-contact-new.component';

describe('Cp2020HotStuffContactNewComponent', () => {
  let component: Cp2020HotStuffContactNewComponent;
  let fixture: ComponentFixture<Cp2020HotStuffContactNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020HotStuffContactNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020HotStuffContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
