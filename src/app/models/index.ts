export interface Step {
  number: number;
  label: string;
  route: string;
}

export interface YourInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SelectPlan {
  plan: string;
  price: number;
  isYearly: boolean;
}

export interface AddOn {
  name: string;
  description: string;
  price: number;
}

export interface FormData {
  yourInfo: YourInfo;
  selectPlan: SelectPlan;
  addOns: AddOn[];
}

export interface AppState {
  form: FormData;
  localStorage: LocalStorageState;
}

export type StorableValue = string | number | boolean | YourInfo | SelectPlan | AddOn[] | null | undefined;

export interface LocalStorageState {
  [key: string]: StorableValue;
}
