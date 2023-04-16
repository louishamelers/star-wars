import { Route } from '@angular/router';
import { PlanetsListComponent } from './pages/planets-list/planets-list.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: PlanetsListComponent,
  },
];
