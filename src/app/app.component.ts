import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<app-navbar></app-navbar> <app-toasts></app-toasts> <router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'star-wars';

  constructor() {}
}
