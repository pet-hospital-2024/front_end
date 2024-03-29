import type { CategoryArr,CaseList,CaseDetailInfo } from "@/api/front/case/type";
import type { TestListArr,QuestionListArr} from "@/api/front/exam/type"

export interface FrontCaseState{
    categoryArr:CategoryArr;
    caseList:CaseList;
    caseDetail:CaseDetailInfo|null;
}

export interface FrontExamState{
    testListArr:TestListArr;
    questionListArr:QuestionListArr;
}