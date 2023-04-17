import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getPaginationData } from '@ngneat/elf-pagination';
import { selectRequestStatus } from '@ngneat/elf-requests';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  map,
  pairwise,
  startWith,
  takeUntil,
} from 'rxjs';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { PeopleState } from 'src/app/core/state';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  destroy$ = new Subject<void>();
  people$ = PeopleState.currentPage$;
  paginationData$ = PeopleState.paginationData$;
  page$ = new Subject<number>();

  showNoResults$?: Observable<boolean>;
  pending$ = PeopleState.store.pipe(
    selectRequestStatus('getPeople'),
    map((state) => state.value === 'pending')
  );

  queryFormControl = new FormControl();

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    const currentPage = PeopleState.store.query(
      getPaginationData()
    ).currentPage;
    this.swapiService.getPeople(currentPage);
    this.handlePagination();
    this.initShowNoResults();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initShowNoResults(): void {
    this.showNoResults$ = combineLatest([
      PeopleState.store.pipe(selectRequestStatus('getPeople')),
      PeopleState.currentPage$,
    ]).pipe(
      map(([state, results]) => {
        return true;
      })
    );
  }

  private handlePagination(): void {
    combineLatest([
      this.queryFormControl.valueChanges.pipe(debounceTime(200), startWith('')),
      this.page$.pipe(startWith(1)),
    ])
      .pipe(
        pairwise(),
        map(([[oldQuery, _], [query, page]]) =>
          query !== oldQuery ? { query, page: 1 } : { query, page }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ query, page }) => this.swapiService.getPeople(page, query));
  }
}
