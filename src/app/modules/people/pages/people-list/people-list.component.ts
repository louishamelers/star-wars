import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { PeopleState } from 'src/app/core/state';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  people$ = PeopleState.currentPage$;
  paginationData$ = PeopleState.paginationData$;
  page$ = new Subject<number>();

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getPeople();
    this.handlePagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handlePagination(): void {
    this.page$.pipe(takeUntil(this.destroy$)).subscribe((pageNumber) => {
      this.swapiService.getPeople(pageNumber);
    });
  }
}
