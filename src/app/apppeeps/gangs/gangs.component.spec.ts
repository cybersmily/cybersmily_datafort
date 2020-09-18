import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GangsComponent } from './gangs.component';

describe('GangsComponent', () => {
  let component: GangsComponent;
  let fixture: ComponentFixture<GangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangsComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [ DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
