import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmoptionsformComponent } from './mmoptionsform.component';

describe('MmoptionsformComponent', () => {
  let component: MmoptionsformComponent;
  let fixture: ComponentFixture<MmoptionsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmoptionsformComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmoptionsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
