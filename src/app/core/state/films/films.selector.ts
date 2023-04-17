import { selectAllEntities } from '@ngneat/elf-entities';
import { shareReplay } from 'rxjs';
import { store } from './films.store';

export const people$ = store.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
