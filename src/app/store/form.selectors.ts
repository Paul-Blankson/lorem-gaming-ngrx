import { createSelector } from '@ngrx/store';
import { AppState, StorableValue, LocalStorageState } from '../models';

export const selectFormState = (state: AppState) => state.form;
export const selectLocalStorageState = (state: AppState) => state.localStorage;

export const selectYourInfo = createSelector(
  selectFormState,
  (state) => state.yourInfo
);

export const selectSelectPlan = createSelector(
  selectFormState,
  (state) => state.selectPlan
);

export const selectAddOns = createSelector(
  selectFormState,
  (state) => state.addOns
);

export const selectStoredValue = (key: string) =>
  createSelector(
    selectLocalStorageState,
    (state: LocalStorageState): StorableValue => state?.[key] ?? null
  );

export const selectAllStoredKeys = createSelector(
  selectLocalStorageState,
  (state: LocalStorageState) => Object.keys(state || {})
);

// Combined selectors
export const selectFormWithStorage = createSelector(
  selectFormState,
  selectLocalStorageState,
  (form, storage) => ({
    form,
    storage,
  })
);

export const selectStoredYourInfo = createSelector(
  selectLocalStorageState,
  (state: LocalStorageState) => state?.['yourInfo'] ?? null
);

export const selectStoredSelectPlan = createSelector(
  selectLocalStorageState,
  (state: LocalStorageState) => state?.['selectPlan'] ?? null
);

export const selectStoredAddOns = createSelector(
  selectLocalStorageState,
  (state: LocalStorageState) => state?.['addOns'] ?? null
);

export const selectHasStoredFormData = createSelector(
  selectLocalStorageState,
  (state: LocalStorageState) =>
    Boolean(state?.['yourInfo'] || state?.['selectPlan'] || state?.['addOns'])
);
