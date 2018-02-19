import { AbsentPatternDetail } from "./absent-pattern-detail";

export interface AbsentPattern {
    id: number;
    patternCd: string;
    name: string;
    absentPatternDtls: AbsentPatternDetail[];
}
