import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { CP2020VehicleDataService } from './../../shared/cp2020/cp2020-vehicles/services/cp2020-vehicle-data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListComponent } from './vehicle-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [VehicleListComponent],
    imports: [],
    providers: [CP2020VehicleDataService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
