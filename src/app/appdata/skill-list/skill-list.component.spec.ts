import { PipesModule } from './../../shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillListComponent } from './skill-list.component';

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillListComponent ],
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
    fixture = TestBed.createComponent(SkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
