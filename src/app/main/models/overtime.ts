import { OvertimeDetail } from "./overtime-detail";

export interface Overtime {
    id: number;
    overtimeCd: string;
    name: string;
    roundingMin: number;
    overtimeDtls: OvertimeDetail[];
}
