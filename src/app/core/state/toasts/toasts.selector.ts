import { selectAllEntities } from '@ngneat/elf-entities';
import { store } from './toasts.store';
import { shareReplay } from 'rxjs';

export const toasts$ = store.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
