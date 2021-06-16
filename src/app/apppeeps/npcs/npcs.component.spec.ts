import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpcsComponent } from './npcs.component';
import { NpcCardColumnComponent } from './../../shared/modules/npcs/npc-card-column/npc-card-column.component';
import { NpcCardComponent } from './../../shared/modules/npcs/npc-card/npc-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services/data.service';
import { Observable } from 'rxjs';

describe('NpcsComponent', () => {
  let component: NpcsComponent;
  let fixture: ComponentFixture<NpcsComponent>;
/*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcsComponent,
        NpcCardColumnComponent,
        NpcCardComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
