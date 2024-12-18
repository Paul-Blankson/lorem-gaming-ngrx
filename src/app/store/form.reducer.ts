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
