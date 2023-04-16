import { Route } from '@angular/router';
import { PeopleListComponent } from './pages/people-list/people-list.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: PeopleListComponent,
  },
];
