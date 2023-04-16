import { selectAllEntities } from '@ngneat/elf-entities';
import { peopleStore } from './people.store';
import { shareReplay } from 'rxjs';

export const people$ = peopleStore.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
