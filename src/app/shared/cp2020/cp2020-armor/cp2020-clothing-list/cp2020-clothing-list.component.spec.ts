import { DataService } from './../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ClothingListComponent } from './cp2020-clothing-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020ClothingListComponent', () => {
  let component: Cp2020ClothingListComponent;
  let fixture: ComponentFixture<Cp2020ClothingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020ClothingListComponent],
    imports: [CommonUiModule],
    providers: [
        DiceService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ClothingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
