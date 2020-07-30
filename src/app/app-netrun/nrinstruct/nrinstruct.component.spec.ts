import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NrinstructComponent } from './nrinstruct.component';

describe('NrinstructComponent', () => {
  let component: NrinstructComponent;
  let fixture: ComponentFixture<NrinstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NrinstructComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrinstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
