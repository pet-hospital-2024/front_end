export interface ResponseData {
    code: number;
    message: string;
}

//前台的考试列表
interface ExamItem {
    exam_id: string,
    paper_id: string,
    paper_name: string,
    duration: number,
    exam_start: string,
    exam_end: string,
}

export type ExamListArr=ExamItem[];

export interface ExamListResponseData extends ResponseData {
    data: ExamListArr;
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
    selectedOpt: null|string,
    status: string,
}

export type QuestionListArr=questionItem[];

export interface TestDetailResponseData extends ResponseData {
    data: QuestionListArr;
}