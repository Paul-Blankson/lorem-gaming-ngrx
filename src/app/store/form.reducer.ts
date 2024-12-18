import { createFeature, createReducer, on } from '@ngrx/store';
import { FormActions } from './form.actions';
import { FormData } from '../models';

export const initialFormState: FormData = {
  yourInfo: {
    name: '',
    email: '',
    phone: '',
  },
  selectPlan: {
    plan: '',
    price: 0,
    isYearly: false,
  },
  addOns: [],
};

export const formFeature = createFeature({
  name: 'form',
  reducer: createReducer(
    initialFormState,
    on(FormActions.setYourInfo, (state, { yourInfo }) => ({
      ...state,
      yourInfo
    })),
    on(FormActions.setSelectPlan, (state, { selectPlan }) => ({
      ...state,
      selectPlan
    })),
    on(FormActions.setAddOns, (state, { addOns }) => ({
      ...state,
      addOns
    })),
    on(FormActions.loadPersistedFormData, (state, { formData }) => ({
      ...state,
      ...formData
    })),
    on(FormActions.clearFormData, () => initialFormState)
  )
});
