import { DataService } from './../../shared/services/file-services';
import { HttpClientModule } from '@angular/common/http';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetArchNewNodeComponent } from './net-arch-new-node.component';

describe('NetArchNewNodeComponent', () => {
  let component: NetArchNewNodeComponent;
  let fixture: ComponentFixture<NetArchNewNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetArchNewNodeComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetArchNewNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
