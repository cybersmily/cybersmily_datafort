import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { ArmorDataListService } from './../services/armor-data-list/armor-data-list.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SourceArmorListComponent } from './cp2020-source-armor-list.component';

describe('Cp2020SourceArmorListComponent', () => {
  let component: Cp2020SourceArmorListComponent;
  let armorDataService: ArmorDataListService;
  let fixture: ComponentFixture<Cp2020SourceArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SourceArmorListComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ArmorDataListService,
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SourceArmorListComponent);
    armorDataService = TestBed.inject(ArmorDataListService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
