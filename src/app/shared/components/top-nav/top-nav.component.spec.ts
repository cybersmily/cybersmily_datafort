import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopNavComponent } from './top-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [RouterTestingModule, CommonUiModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verfiy url', () => {
    expect(component.isExternal('http://cybersmily.net')).toBeTruthy();
    expect(component.isExternal('cybersmily.net')).toBeFalsy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
