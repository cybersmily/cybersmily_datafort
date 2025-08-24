import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { Cp2020ContactsModule } from './../../cp2020-contacts.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HotStuffContactsComponent } from './cp2020-hot-stuff-contacts.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020HotStuffContactsComponent', () => {
  let component: Cp2020HotStuffContactsComponent;
  let fixture: ComponentFixture<Cp2020HotStuffContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020HotStuffContactsComponent],
    imports: [Cp2020ContactsModule,
        HttpClientTestingModule],
    providers: [DiceService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(Cp2020HotStuffContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
