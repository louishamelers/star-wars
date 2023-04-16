import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { withRequestsStatus } from '@ngneat/elf-requests';
import { MODELS } from 'src/app/shared';

export const filmsStore = createStore(
  { name: 'films' },
  withEntities<MODELS.Film>(),
  withRequestsStatus()
  // withPagination()
);
