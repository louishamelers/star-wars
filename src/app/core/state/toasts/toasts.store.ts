import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { MODELS } from 'src/app/shared';

export const toastsStore = createStore(
  { name: 'toasts' },
  withEntities<MODELS.Toast>()
);
