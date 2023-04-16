import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaginationComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent, NavbarComponent],
})
export class SharedModule {}
