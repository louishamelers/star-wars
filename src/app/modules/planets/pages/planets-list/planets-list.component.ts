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
import { PlanetsState } from 'src/app/core/state';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss'],
})
export class PlanetsListComponent implements OnInit {
  destroy$ = new Subject<void>();
  planets$ = PlanetsState.currentPage$;
  paginationData$ = PlanetsState.paginationData$;
  page$ = new Subject<number>();

  showNoResults$?: Observable<boolean>;
  pending$ = PlanetsState.store.pipe(
    selectRequestStatus('getPlanets'),
    map((state) => state.value === 'pending')
  );

  queryFormControl = new FormControl();

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    const currentPage = PlanetsState.store.query(
      getPaginationData()
    ).currentPage;
    this.swapiService.getPlanets(currentPage);
    this.handlePagination();
    this.initShowNoResults();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initShowNoResults(): void {
    this.showNoResults$ = combineLatest([
      PlanetsState.store.pipe(selectRequestStatus('getPlanets')),
      PlanetsState.currentPage$,
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
      .subscribe(({ query, page }) =>
        this.swapiService.getPlanets(page, query)
      );
  }
}
