import { Prorate } from "./prorate";
import { PayrollComponentDetail } from "./payroll-component-detail";

export interface PayrollComponent {
    id: number;
    componentCd: string;
    name: string;
    calcType: string;
    calcTypeDescs: string;    
    tax: boolean;
    absentDeduct: boolean;
    payrollDeduct: boolean;
    compSubsidize: boolean;
    payrollComponentDtls: PayrollComponentDetail[];
    proRate: Prorate;
}
