import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpnCustomizerMainComponent } from './wpn-customizer-main.component';

describe('WpnCustomizerMainComponent', () => {
  let component: WpnCustomizerMainComponent;
  let fixture: ComponentFixture<WpnCustomizerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpnCustomizerMainComponent ],
      imports: [ CommonUiModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpnCustomizerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
