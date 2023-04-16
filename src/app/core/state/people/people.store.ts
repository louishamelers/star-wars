import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { withRequestsStatus } from '@ngneat/elf-requests';
import { MODELS } from 'src/app/shared';

export interface PersonProperties {
  nextPage?: number;
}

export const peopleStore = createStore(
  { name: 'people' },
  withEntities<MODELS.Person>(),
  withProps<PersonProperties>({}),
  withRequestsStatus()
);
