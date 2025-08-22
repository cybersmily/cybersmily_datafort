import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NetArchNodeComponent } from './net-arch-node.component';

describe('NetArchNodeComponent', () => {
  let component: NetArchNodeComponent;
  let fixture: ComponentFixture<NetArchNodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [NetArchNodeComponent],
    imports: [CommonUiModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi())
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
