import type { CategoryArr,CaseList,CaseDetailInfo } from "@/api/front/case/type";
import type { TestListArr,QuestionListArr,TestDetail} from "@/api/front/exam/type"
import type { DutyArr,LocationArr,ProcessArr } from "@/api/front/study/type";

export interface FrontCaseState{
    categoryArr:CategoryArr;
    caseList:CaseList;
    caseDetail:CaseDetailInfo|null;
}

export interface FrontExamState{
    testListArr:TestListArr;
    questionListArr:QuestionListArr;
    testData:TestDetail|null;
    isSubmitted: boolean;
}

export interface FrontRoleState{
    dutyListArr:DutyArr;
    locationListArr:LocationArr;
    processListArr:ProcessArr;
}