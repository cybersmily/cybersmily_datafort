import { Cp2020DatafortRandomGeneratorService } from './../services/cp2020-datafort-random-generator.service';
import { Cp2020DatafortSvgBuilderService } from './../services/cp2020-datafort-svg-builder.service';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { SaveFileService } from './../../../services/file-services/save-file/save-file.service';
import { FileLoaderService } from './../../../services/file-services/file-loader/file-loader.service';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortFormComponent } from './cp2020-datafort-form.component';

describe('Cp2020DatafortFormComponent', () => {
  let component: Cp2020DatafortFormComponent;
  let fixture: ComponentFixture<Cp2020DatafortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortFormComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService,
        FileLoaderService,
        SaveFileService,
        Cp2020DatafortBuilderService,
        Cp2020DatafortSvgBuilderService,
        Cp2020DatafortRandomGeneratorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
