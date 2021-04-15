import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluePrintsComponent } from './blue-prints.component';

describe('BluePrintsComponent', () => {
  let component: BluePrintsComponent;
  let fixture: ComponentFixture<BluePrintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluePrintsComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluePrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
