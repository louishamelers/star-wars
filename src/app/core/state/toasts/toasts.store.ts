import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { MODELS } from 'src/app/shared';

export const store = createStore(
  { name: 'toasts' },
  withEntities<MODELS.Toast>()
);
