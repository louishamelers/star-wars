import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsDetailComponent } from './pages/planets-detail/planets-detail.component';
import { PlanetsListComponent } from './pages/planets-list/planets-list.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlanetsDetailComponent, PlanetsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
  ],
})
export class PlanetsModule {}
