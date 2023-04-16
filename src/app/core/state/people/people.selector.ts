import { selectAllEntities } from '@ngneat/elf-entities';
import { peopleStore } from './people.store';
import { map, shareReplay } from 'rxjs';
import {
  selectCurrentPageEntities,
  selectPaginationData,
} from '@ngneat/elf-pagination';

export const people$ = peopleStore.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);
export const currentPage$ = peopleStore.pipe(selectCurrentPageEntities());
export const paginationData$ = peopleStore.pipe(selectPaginationData()).pipe(
  map((paginationData) => ({
    ...paginationData,
    totalPages: Math.ceil(paginationData.total / 10) || 0,
  }))
);;
