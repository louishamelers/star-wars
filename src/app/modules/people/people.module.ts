import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilmsModule } from '../films/films.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PeopleListComponent, PeopleDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    FilmsModule,
    ReactiveFormsModule,
  ],
})
export class PeopleModule {}
