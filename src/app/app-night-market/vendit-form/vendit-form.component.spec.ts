import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditFormComponent } from './vendit-form.component';

describe('VenditFormComponent', () => {
  let component: VenditFormComponent;
  let fixture: ComponentFixture<VenditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenditFormComponent ],
      providers: [
        DataService,
        DiceService
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
