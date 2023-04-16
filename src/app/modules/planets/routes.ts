import { Route } from '@angular/router';
import { PlanetsListComponent } from './pages/planets-list/planets-list.component';
import { PlanetsDetailComponent } from './pages/planets-detail/planets-detail.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: PlanetsListComponent,
  },
  {
    path: ':id',
    component: PlanetsDetailComponent,
  },
];
