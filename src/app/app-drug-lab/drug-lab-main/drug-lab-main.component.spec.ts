import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugLabMainComponent } from './drug-lab-main.component';

describe('DrugLabMainComponent', () => {
  let component: DrugLabMainComponent;
  let fixture: ComponentFixture<DrugLabMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugLabMainComponent ],
      imports: [CommonUiModule],
      providers: [ SeoService]
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
