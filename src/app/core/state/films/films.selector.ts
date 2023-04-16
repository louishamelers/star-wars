import { selectAllEntities } from '@ngneat/elf-entities';
import { shareReplay } from 'rxjs';
import { filmsStore } from './films.store';

export const people$ = filmsStore.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
