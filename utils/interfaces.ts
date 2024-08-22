export interface ApiHelperProps {
  url: string;
  method: string;
  data?: object;
  contentType?: string;
}

export interface SalaryProps {
  _id: string;
  email: string;
  month: number;
  basicSalary: number;
  transportAllowance: number;
  medicalAllowance: number;
  taxDeduction: number;
}

export interface SalaryListProps {
  salaries: SalaryProps[];
}

export interface EmployeeProps {
  _id: string;
  name: string;
  email: string;
  designation: string;
}

export interface LogProps {
  _id: string;
  date: Date;
  message: string;
}
