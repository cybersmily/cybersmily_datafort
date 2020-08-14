import { PipesModule } from './../../shared/pipes/pipes.module';
import { WeaponDataService } from './../../shared/services/data/weapon-data.service';
import { DataService } from './../../shared/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpnListComponent } from './wpn-list.component';

describe('WpnListComponent', () => {
  let component: WpnListComponent;
  let fixture: ComponentFixture<WpnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WpnListComponent],
      imports: [HttpClientTestingModule, PipesModule],
      providers: [DataService, WeaponDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
