import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter();
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;

  destroy$ = new Subject<void>();
  selectedPage$ = new Subject<number>();

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(null)
      .map((_, i) => i + 1);
  }

  constructor() {}

  ngOnInit(): void {
    this.handleSelectedPage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleSelectedPage(): void {
    this.selectedPage$.pipe(takeUntil(this.destroy$)).subscribe((page) => {
      this.selectedPage.emit(page);
    });
  }
}
