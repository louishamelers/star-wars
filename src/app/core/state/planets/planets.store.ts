import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { withPagination } from '@ngneat/elf-pagination';
import { withRequestsStatus } from '@ngneat/elf-requests';
import { MODELS } from 'src/app/shared';

export const store = createStore(
  { name: 'planets' },
  withEntities<MODELS.Planet>(),
  withRequestsStatus(),
  withPagination()
);
