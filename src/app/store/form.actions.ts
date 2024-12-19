import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { YourInfo, SelectPlan, AddOn, StorableValue } from '../models';

export const FormActions = createActionGroup({
  source: 'Form',
  events: {
    'Set Your Info': props<{ yourInfo: YourInfo }>(),
    'Set Select Plan': props<{ selectPlan: SelectPlan }>(),
    'Set Add Ons': props<{ addOns: AddOn[] }>(),
    'Clear Form Data': emptyProps(),
  }
});

export const localStorageActions = createActionGroup({
  source: 'LocalStorage',
  events: {
    'Save Data': props<{ key: string; value: StorableValue }>(),
    'Get Data': props<{ key: string }>(),
    'Remove Data': props<{ key: string }>(),
    'Clear Form Data': emptyProps()
  }
});
