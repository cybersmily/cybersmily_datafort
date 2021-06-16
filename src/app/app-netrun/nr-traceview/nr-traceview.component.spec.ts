import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrTraceviewComponent } from './nr-traceview.component';
import { NrTrackerService } from '../services';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('NrTraceviewComponent', () => {
  let component: NrTraceviewComponent;
  let fixture: ComponentFixture<NrTraceviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrTraceviewComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
        BsModalRef,
        NrTrackerService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrTraceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
