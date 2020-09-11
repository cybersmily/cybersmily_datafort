import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberwareTableComponent } from './cp2020-cyberware-table.component';

describe('Cp2020CyberwareTableComponent', () => {
  let component: Cp2020CyberwareTableComponent;
  let fixture: ComponentFixture<Cp2020CyberwareTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020CyberwareTableComponent ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberwareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
