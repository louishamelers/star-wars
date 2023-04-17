import { Injectable } from '@angular/core';
import { ToastsState } from '../state';
import { deleteEntities, upsertEntities } from '@ngneat/elf-entities';
import { MODELS } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  addToast(message: string, type: MODELS.ToastType = 'info'): void {
    const id = crypto.randomUUID();
    ToastsState.store.update(upsertEntities({ id, message, type }));
  }

  removeToast(id: string): void {
    ToastsState.store.update(deleteEntities(id));
  }
}
