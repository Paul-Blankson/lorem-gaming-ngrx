import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorableValue } from '../models';
import { localStorageActions } from '../store/form.actions';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private readonly store: Store) {}

  saveData(key: string, value: StorableValue): void {
    this.store.dispatch(localStorageActions.saveData({ key, value }));
  }

  getData(key: string): void {
    return this.store.dispatch(localStorageActions.getData({ key }));
  }

  removeData(key: string): void {
    this.store.dispatch(localStorageActions.removeData({ key }));
  }

  clearFormData(): void {
    this.store.dispatch(localStorageActions.clearFormData());
  }
}
