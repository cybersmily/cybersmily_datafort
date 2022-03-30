import { DataService } from './../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortEditorComponent } from './cp2020-datafort-editor.component';

describe('Cp2020DatafortEditorComponent', () => {
  let component: Cp2020DatafortEditorComponent;
  let fixture: ComponentFixture<Cp2020DatafortEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortEditorComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        Cp2020DatafortBuilderService,
        DiceService,
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
