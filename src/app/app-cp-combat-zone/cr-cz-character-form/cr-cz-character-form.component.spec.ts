import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzCharacterFormComponent } from './cr-cz-character-form.component';

describe('CrCzCharacterFormComponent', () => {
  let component: CrCzCharacterFormComponent;
  let fixture: ComponentFixture<CrCzCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzCharacterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
