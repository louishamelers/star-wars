import { Route } from '@angular/router';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: PeopleListComponent,
  },
  {
    path: ':id',
    component: PeopleDetailComponent,
  },
];
