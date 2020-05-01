import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { TestBed } from '@angular/core/testing';

import { SkillListService } from './skill-list.service';

describe('SkillListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DataService
    ]
  }));

  it('should be created', () => {
    const service: SkillListService = TestBed.get(SkillListService);
    expect(service).toBeTruthy();
  });
});
