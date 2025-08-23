import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzCharacterListComponent } from './cr-cz-character-list.component';

describe('CrCzCharacterListComponent', () => {
  let component: CrCzCharacterListComponent;
  let fixture: ComponentFixture<CrCzCharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrCzCharacterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzCharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
