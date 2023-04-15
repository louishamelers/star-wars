import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsDetailComponent } from './pages/planets-detail/planets-detail.component';
import { PlanetsListComponent } from './pages/planets-list/planets-list.component';



@NgModule({
  declarations: [
    PlanetsDetailComponent,
    PlanetsListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlanetsModule { }
