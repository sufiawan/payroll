import { Time } from "@angular/common";

export interface AbsentPatternDetail {
    id: number;
    dayPeriod: number;
    dayStatus: string;
    timeIn: Time;
    timeOut: Time;
    breakIn: Time;
    breakOut: Time;    
}
