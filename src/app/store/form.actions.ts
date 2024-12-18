import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { YourInfo, SelectPlan, AddOn } from '../models';

export const FormActions = createActionGroup({
  source: 'Form',
  events: {
    'Set Your Info': props<{ yourInfo: YourInfo }>(),
    'Set Select Plan': props<{ selectPlan: SelectPlan }>(),
    'Set Add Ons': props<{ addOns: AddOn[] }>(),
    'Clear Form Data': emptyProps(),
    'Load Form Data From Storage': emptyProps(),
    'Form Data Loaded': props<{ formData: Partial<FormData> }>(),
    'Save Form Data To Storage': emptyProps()
  }
});
