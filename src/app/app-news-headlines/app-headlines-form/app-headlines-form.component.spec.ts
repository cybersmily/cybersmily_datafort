import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeadlinesFormComponent } from './app-headlines-form.component';

describe('CpHeadlinesFormComponent', () => {
  let component: AppHeadlinesFormComponent;
  let fixture: ComponentFixture<AppHeadlinesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AppHeadlinesFormComponent],
    imports: [],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi())
    ]
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
