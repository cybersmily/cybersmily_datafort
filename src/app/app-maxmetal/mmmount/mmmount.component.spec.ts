import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmmountComponent } from './mmmount.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MmmountComponent', () => {
  let component: MmmountComponent;
  let fixture: ComponentFixture<MmmountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmmountComponent
      ],
      imports: [
        FontAwesomeModule,
        CollapseModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
