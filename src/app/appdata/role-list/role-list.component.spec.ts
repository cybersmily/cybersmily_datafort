import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleListComponent } from './role-list.component';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListComponent ],
      providers: [DataService],
      imports: [
        HttpClientModule,
        CommonUiModule,
        PipesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
