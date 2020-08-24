import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { DrugLabListComponent } from './../drug-lab-list/drug-lab-list.component';
import { DrugLabGeneratorComponent } from './../drug-lab-generator/drug-lab-generator.component';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugLabMainComponent } from './drug-lab-main.component';

describe('DrugLabMainComponent', () => {
  let component: DrugLabMainComponent;
  let fixture: ComponentFixture<DrugLabMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DrugLabMainComponent,
        DrugLabGeneratorComponent,
        DrugLabListComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugLabMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
