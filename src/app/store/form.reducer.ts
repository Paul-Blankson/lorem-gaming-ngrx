import { createFeature, createReducer, on } from '@ngrx/store';
import { FormActions, localStorageActions } from './form.actions';
import { FormData, LocalStorageState } from '../models';

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
      yourInfo,
    })),
    on(FormActions.setSelectPlan, (state, { selectPlan }) => ({
      ...state,
      selectPlan,
    })),
    on(FormActions.setAddOns, (state, { addOns }) => ({
      ...state,
      addOns,
    })),
    on(FormActions.clearFormData, () => initialFormState)
  ),
});

export const initialLocalStorageState: LocalStorageState = {};

export const localStorageFeature = createFeature({
  name: 'localStorage',
  reducer: createReducer(
    initialLocalStorageState,
    on(localStorageActions.saveData, (state, { key, value }) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return {
        ...state,
        [key]: value,
      };
    }),
    on(localStorageActions.getData, (state, { key }) => {
      try {
        const storedValue = localStorage.getItem(key);
        const parsedValue = storedValue ? JSON.parse(storedValue) : null;
        return {
          ...state,
          [key]: parsedValue,
        };
      } catch (error) {
        console.error('Error getting data from localStorage:', error);
        return state;
      }
    }),
    on(localStorageActions.removeData, (state, { key }) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing localStorage:', error);
      }
      // Create new state without the cleared key
      const { [key]: removedKey, ...remainingState } = state;
      return remainingState;
    }),
    on(localStorageActions.clearFormData, () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
      return initialLocalStorageState;
    })
  ),
});

export const { selectLocalStorageState, selectLocalStorage } =
  localStorageFeature;
