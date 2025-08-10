import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { FooterComponent, TopNavComponent } from './shared/components';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
      TopNavComponent,
      FooterComponent,
      SharedModule,
      RouterOutlet,
      FormsModule
    ]

})
export class AppComponent {
  title = `Cybersmily's Datafort`;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
     }
   });

  }
}
