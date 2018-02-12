export interface TimeOffPolicy {
    id: number;
    timeOffCd: string;
    name: string;
    resetBy: string;
    resetByDescs: string;
    customDate: Date;
    timeOffVal: number;    
}
