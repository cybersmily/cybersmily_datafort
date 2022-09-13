import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OtherContactNewComponent } from './cp2020-other-contact-new.component';

describe('Cp2020OtherContactNewComponent', () => {
  let component: Cp2020OtherContactNewComponent;
  let fixture: ComponentFixture<Cp2020OtherContactNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OtherContactNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020OtherContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
