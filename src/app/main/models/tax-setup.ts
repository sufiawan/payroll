import { TaxSetupDetail } from "./tax-setup-detail";
import { Company } from "./company";

export interface TaxSetup {
    id: number;
    company: Company;
    ptkpPribadi: number;
    ptkpIstri: number;
    ptkpTanggungan: number;
    maxTanggungan: number;
    rounding: boolean;
    taxSetupDtls: TaxSetupDetail[];
}
