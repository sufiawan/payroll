import { TimeOffPolicy } from "./time-off-policy";

export interface TimeOffScheme {
    id: number;
    schemeCd: string;
    name: string;
    timeOffPolicy: TimeOffPolicy[];
}
