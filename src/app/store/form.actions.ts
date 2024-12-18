import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { YourInfo, SelectPlan, AddOn } from '../models';

export const FormActions = createActionGroup({
  source: 'Form',
  events: {
    'Set Your Info': props<{ yourInfo: YourInfo }>(),
    'Set Select Plan': props<{ selectPlan: SelectPlan }>(),
    'Set Add Ons': props<{ addOns: AddOn[] }>(),
    'Clear Form Data': emptyProps(),
    'Load Persisted Form Data': props<{ formData: Partial<FormData> }>()
  }
});
