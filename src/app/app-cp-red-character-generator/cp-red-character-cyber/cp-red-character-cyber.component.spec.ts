import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterCyberComponent } from './cp-red-character-cyber.component';

describe('CpRedCharacterCyberComponent', () => {
  let component: CpRedCharacterCyberComponent;
  let fixture: ComponentFixture<CpRedCharacterCyberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterCyberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterCyberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
