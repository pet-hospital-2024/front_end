import type { CategoryArr,CaseList,CaseDetailInfo } from "@/api/front/case/type";
import type { TestListArr,QuestionListArr,TestDetail} from "@/api/front/exam/type"
import type { DutyArr,LocationArr,ProcessArr } from "@/api/front/study/type";
import type { MessageArr } from "@/api/front/ai/type"

export interface FrontCaseState{
    categoryArr:CategoryArr;
    caseList:CaseList;
    caseDetail:CaseDetailInfo|null;
    pictureList:Array<string>;
    videoList:Array<string>;
}

export interface FrontExamState{
    testListArr:TestListArr;
    questionListArr:QuestionListArr;
    testData:TestDetail|null;
    isSubmitted: boolean;
}

export interface FrontRoleState{
    dutyListArr:DutyArr;
    locationListArr:DutyArr;
    processListArr:ProcessArr;
}

export interface FrontAIState{
    messageArr:MessageArr;
    nextMessageId:number;
    isSending: boolean;
    eventSource:any;
}