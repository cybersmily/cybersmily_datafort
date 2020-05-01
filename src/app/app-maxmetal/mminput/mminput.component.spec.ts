import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MminputComponent } from './mminput.component';

describe('MminputComponent', () => {
  let component: MminputComponent;
  let fixture: ComponentFixture<MminputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MminputComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MminputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
