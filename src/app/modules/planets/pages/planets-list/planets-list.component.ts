import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getPaginationData } from '@ngneat/elf-pagination';
import {
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

  queryFormControl = new FormControl();

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    const currentPage = PlanetsState.planetsStore.query(
      getPaginationData()
    ).currentPage;
    this.swapiService.getPlanets(currentPage);
    this.handlePagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
