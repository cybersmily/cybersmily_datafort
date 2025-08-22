import { PipesModule } from './../../shared/pipes/pipes.module';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramListComponent } from './program-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProgramListComponent', () => {
  let component: ProgramListComponent;
  let fixture: ComponentFixture<ProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ProgramListComponent],
    imports: [PipesModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
