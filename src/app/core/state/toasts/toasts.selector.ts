import { selectAllEntities } from '@ngneat/elf-entities';
import { toastsStore } from './toasts.store';
import { shareReplay } from 'rxjs';

export const toasts$ = toastsStore.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
