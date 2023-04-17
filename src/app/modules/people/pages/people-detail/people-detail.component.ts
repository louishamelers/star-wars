import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { selectEntity } from '@ngneat/elf-entities';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { PeopleState } from 'src/app/core/state';
import { UTIL } from 'src/app/shared';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
})
export class PeopleDetailComponent implements OnInit {
  person$?: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.person$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter(UTIL.isNotNullOrUndefined),
      tap((id) => {
        this.swapiService.getPerson(id);
      }),
      switchMap((id: string) => PeopleState.store.pipe(selectEntity(id)))
    );
  }
}
