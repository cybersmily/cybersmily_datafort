import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services/data.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchNodeComponent } from './net-arch-node.component';

describe('NetArchNodeComponent', () => {
  let component: NetArchNodeComponent;
  let fixture: ComponentFixture<NetArchNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetArchNodeComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
