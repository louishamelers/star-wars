import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';

@NgModule({
  declarations: [PeopleListComponent, PeopleDetailComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class PeopleModule {}
