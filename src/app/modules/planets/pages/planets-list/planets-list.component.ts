import { Component, OnInit } from '@angular/core';
import { getPaginationData } from '@ngneat/elf-pagination';
import { Subject, startWith, takeUntil } from 'rxjs';
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
    this.page$.pipe(takeUntil(this.destroy$)).subscribe((pageNumber) => {
      console.log(pageNumber);

      this.swapiService.getPlanets(pageNumber);
    });
  }
}
