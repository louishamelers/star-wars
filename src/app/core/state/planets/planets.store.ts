import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { withPagination } from '@ngneat/elf-pagination';
import { withRequestsStatus } from '@ngneat/elf-requests';
import { MODELS } from 'src/app/shared';

export interface PlanetProperties {
  nextPage?: number;
}

export const planetsStore = createStore(
  { name: 'planets' },
  withEntities<MODELS.Planet>(),
  withProps<PlanetProperties>({}),
  withRequestsStatus(),
  withPagination()
);