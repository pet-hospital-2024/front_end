export interface ResponseData {
    code: number;
    message: string;
}

//前台的考试列表
interface TestItem {
    exam_id: string,
    paper_id: string,
    exam_name: string,
    duration: number,
    exam_start: string|null,
    exam_end: string|null,
}

export type TestListArr=TestItem[];

export interface TestListResponseData extends ResponseData {
    data: TestListArr;
}

//试卷详情
interface optItem{
    optCode: string;
    optContent: string;
}

export interface questionItem {
    question_id: string,
    order: string,
    question_body:string,
    type: string,
    options: optItem[],
    right_choice: string,
    value: number,
    // selectedOpt: null|string,
    // status: string,
}

export type QuestionListArr=questionItem[];

export interface TestDetail{
    paper_id: string,
    paper_name: string,
    duration: number,
    question_number: number,
    value: number,
    questions: QuestionListArr;
}
export interface TestDetailResponseData extends ResponseData {
    data: TestDetail;
}