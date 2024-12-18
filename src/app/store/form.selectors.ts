import { createSelector } from '@ngrx/store';
import { AppState } from '../models';

export const selectFormState = (state: AppState) => state.form;

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
