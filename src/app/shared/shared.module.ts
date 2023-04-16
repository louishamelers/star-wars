import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [OrderByPipe, PaginationComponent],
  imports: [CommonModule],
  exports: [OrderByPipe, PaginationComponent],
})
export class SharedModule {}
