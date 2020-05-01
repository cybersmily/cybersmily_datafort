import { PipesModule } from './../../shared/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CyberDataService } from './../../shared/services/data/cyber-data.service';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberListComponent } from './cyber-list.component';

describe('CyberListComponent', () => {
  let component: CyberListComponent;
  let fixture: ComponentFixture<CyberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyberListComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        PipesModule
      ],
      providers: [
        DataService,
        CyberDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
