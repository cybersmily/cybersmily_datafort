import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsadminComponent } from './newsadmin.component';

describe('NewsadminComponent', () => {
  let component: NewsadminComponent;
  let fixture: ComponentFixture<NewsadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsadminComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
