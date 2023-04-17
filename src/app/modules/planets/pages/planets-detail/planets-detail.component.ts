import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { selectEntity } from '@ngneat/elf-entities';
import { Observable, map, filter, tap, switchMap } from 'rxjs';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { PeopleState, PlanetsState } from 'src/app/core/state';
import { UTIL } from 'src/app/shared';

@Component({
  selector: 'app-planets-detail',
  templateUrl: './planets-detail.component.html',
  styleUrls: ['./planets-detail.component.scss'],
})
export class PlanetsDetailComponent implements OnInit {
  planet$?: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.planet$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter(UTIL.isNotNullOrUndefined),
      tap((id) => {
        this.swapiService.getPlanet(id);
      }),
      switchMap((id: string) => PlanetsState.store.pipe(selectEntity(id)))
    );
  }
}
