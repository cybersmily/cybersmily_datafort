import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { MaxmetalService } from './../../shared/services/maxmetal/maxmetal.service';
import { DataService } from './../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmweaponformComponent } from './mmweaponform.component';

describe('MmmweaponformComponent', () => {
  let component: MmweaponformComponent;
  let fixture: ComponentFixture<MmweaponformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmweaponformComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [
        DataService,
        MaxmetalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmweaponformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
