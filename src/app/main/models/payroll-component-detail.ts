import { PayrollComponent } from "./payroll-component";

export interface PayrollComponentDetail {
    id: number;
    calcTypeDescs: string;
    descs: string;
    calcType: string;
    maxSalaryCalc: number;
    employeeVAl: number;
    companyVal: number;
    payrollComponent: PayrollComponent;
}
