import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchNodeSvgComponent } from './net-arch-node-svg.component';

describe('NetArchNodeSvgComponent', () => {
  let component: NetArchNodeSvgComponent;
  let fixture: ComponentFixture<NetArchNodeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchNodeSvgComponent ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchNodeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
