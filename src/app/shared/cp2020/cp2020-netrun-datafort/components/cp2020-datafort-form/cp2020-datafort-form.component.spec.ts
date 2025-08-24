import {
  Cp2020DatafortRandomGeneratorService,
  Cp2020DatafortSvgBuilderService,
  Cp2020DatafortBuilderService,
} from '../../services';

import {
  SaveFileService,
  FileLoaderService,
  DataService,
} from '../../../../services/file-services';
import { DiceService } from '../../../../services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from '../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortFormComponent } from './cp2020-datafort-form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020DatafortFormComponent', () => {
  let component: Cp2020DatafortFormComponent;
  let fixture: ComponentFixture<Cp2020DatafortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020DatafortFormComponent],
    imports: [CommonUiModule,
        BrowserAnimationsModule],
    providers: [
        DataService,
        DiceService,
        FileLoaderService,
        SaveFileService,
        Cp2020DatafortBuilderService,
        Cp2020DatafortSvgBuilderService,
        Cp2020DatafortRandomGeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
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
