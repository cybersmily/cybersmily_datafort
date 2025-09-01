import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services';
import { CommonUiModule } from './../../common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NpcCardComponent } from './npc-card.component';
import { NpcCard } from '../../../models/character';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NpcCardComponent', () => {
  let component: NpcCardComponent;
  let fixture: ComponentFixture<NpcCardComponent>;
  const npc: NpcCard = {
    name: 'test1',
    img: 'test1',
    career: 'fixer'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NpcCardComponent
    ],
    imports: [CommonUiModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcCardComponent);
    component = fixture.componentInstance;
    component.npcCard = npc;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
  TestBed.resetTestingModule();
});
});
