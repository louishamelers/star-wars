import { Component, Input, OnInit } from '@angular/core';
import { selectEntity } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { FilmsState } from 'src/app/core/state';
import { MODELS, UTIL } from 'src/app/shared';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
  @Input() filmId?: string;
  film$?: Observable<MODELS.Film | undefined>;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    if (UTIL.isNotNullOrUndefined(this.filmId)) {
      this.swapiService.getFilm(this.filmId);
      this.film$ = FilmsState.filmsStore.pipe(selectEntity(this.filmId));
    }
  }
}
