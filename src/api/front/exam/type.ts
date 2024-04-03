export interface ResponseData {
  code: number;
  message: string;
}

//前台的考试列表
interface TestItem {
  exam_id: string;
  paper_id: string;
  exam_start: string | null;
  exam_end: string | null;
  exam_name: string;
  duration: number;
}

export type TestListArr = TestItem[];

export interface TestListResponseData extends ResponseData {
  data: TestListArr;
}

//试卷详情
interface optItem {
  optCode: string;
  optContents: string;
}

export interface questionItem {
  question_id: string;
  order: string;
  question_body: string;
  type: string;
  options: optItem[];
  right_choice: string;
  value: number;
  // selectedOpt: null|string,
  // status: string,
}

export type QuestionListArr = questionItem[];

export interface TestDetail {
  paper_id: string;
  paper_name: string;
  duration: number;
  question_id: null | string;
  question_number: number;
  question_value: number;
  questions: QuestionListArr;
  selectedOpt: null | string;
  status: string;
}
export interface TestDetailResponseData extends ResponseData {
  data: TestDetail;
}
