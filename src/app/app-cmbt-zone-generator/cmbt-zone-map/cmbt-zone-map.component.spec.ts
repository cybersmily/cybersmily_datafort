import { CmbtZoneBlockService } from './../../shared/services/cmbt-zone/cmbt-zone-block.service';
import { CmbtZoneStreetObjectService } from './../../shared/services/cmbt-zone/cmbt-zone-street-object.service';
import { CmbtZoneBuildingService } from './../../shared/services/cmbt-zone/cmbt-zone-building.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtZoneMapComponent } from './cmbt-zone-map.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CmbtZoneMapComponent', () => {
  let component: CmbtZoneMapComponent;
  let fixture: ComponentFixture<CmbtZoneMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [CmbtZoneMapComponent],
    imports: [],
    providers: [
        DataService,
        DiceService,
        CmbtZoneBuildingService,
        CmbtZoneStreetObjectService,
        CmbtZoneBlockService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtZoneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
