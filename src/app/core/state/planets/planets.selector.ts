import { selectAllEntities } from '@ngneat/elf-entities';
import { planetsStore } from './planets.store';
import { map, shareReplay } from 'rxjs';
import {
  selectCurrentPageEntities,
  selectPaginationData,
} from '@ngneat/elf-pagination';

export const planets$ = planetsStore.pipe(
  selectAllEntities(),
  shareReplay({ refCount: true })
);

export const currentPage$ = planetsStore.pipe(selectCurrentPageEntities());
export const paginationData$ = planetsStore.pipe(selectPaginationData()).pipe(
  map((paginationData) => ({
    ...paginationData,
    totalPages: Math.ceil(paginationData.total / 10) || 0,
  }))
);
