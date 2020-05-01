import { CollapseModule } from 'ngx-bootstrap/collapse';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopNavComponent } from './top-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavComponent ],
      imports: [
        RouterTestingModule,
        CollapseModule,
        FontAwesomeModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
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
