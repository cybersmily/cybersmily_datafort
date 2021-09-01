import { PipesModule } from './../../shared/pipes/pipes.module';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2077TrackerMainComponent } from './cp2077-tracker-main.component';

describe('Cp2077TrackerMainComponent', () => {
  let component: Cp2077TrackerMainComponent;
  let fixture: ComponentFixture<Cp2077TrackerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2077TrackerMainComponent ],
      imports: [CommonUiModule,
        HttpClientTestingModule,
        PipesModule
      ],
      providers: [DataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2077TrackerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
