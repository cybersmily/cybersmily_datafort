import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeadlinesFormComponent } from './app-headlines-form.component';

describe('CpHeadlinesFormComponent', () => {
  let component: AppHeadlinesFormComponent;
  let fixture: ComponentFixture<AppHeadlinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeadlinesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeadlinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
