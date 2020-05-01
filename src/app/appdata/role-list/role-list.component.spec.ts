import { PipesModule } from './../../shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListComponent } from './role-list.component';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListComponent ],
      providers: [DataService],
      imports: [
        HttpClientModule,
        FormsModule,
        PipesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
