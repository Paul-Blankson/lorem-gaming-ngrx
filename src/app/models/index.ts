export interface Step {
  number: number;
  label: string;
  route: string;
}

interface YourInfo {
  name: string;
  email: string;
  phone: string;
}

interface SelectPlan {
  plan: string;
  price: number;
  isYearly: boolean;
}

export interface FormData {
  yourInfo: YourInfo;
  selectPlan: SelectPlan;
  addOns: string[];
}
