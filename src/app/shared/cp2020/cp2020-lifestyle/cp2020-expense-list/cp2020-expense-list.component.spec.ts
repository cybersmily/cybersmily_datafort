import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/data.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ExpenseListComponent } from './cp2020-expense-list.component';

describe('Cp2020ExpenseListComponent', () => {
  let component: Cp2020ExpenseListComponent;
  let fixture: ComponentFixture<Cp2020ExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ExpenseListComponent ],
      imports: [CommonUiModule,
      HttpClientTestingModule],
      providers: [DataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
