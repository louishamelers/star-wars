import { selectAllEntities } from '@ngneat/elf-entities';
import { store } from './people.store';
import { map, shareReplay } from 'rxjs';
import {
  selectCurrentPageEntities,
  selectPaginationData,
} from '@ngneat/elf-pagination';

export const people$ = store.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
export const currentPage$ = store.pipe(selectCurrentPageEntities());
export const paginationData$ = store.pipe(selectPaginationData()).pipe(
  map((paginationData) => ({
    ...paginationData,
    totalPages: Math.ceil(paginationData.total / 10) || 0,
  }))
);
