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
  question_body: string;
  type: string;
  right_choice: string;
  value: number;
  order: string;
  options: optItem[];
  selectedOpt: null | string;
  status: string;
  disease_id: string;
  department_id: string;
  a: string;
  b: string;
  c: string;
  d: string;
}

export type QuestionListArr = questionItem[];

export interface TestDetail {
  paper_id: string;
  paper_name: string;
  duration: number;
  question_number: number;
  value: number;
  questions: QuestionListArr;
}
export interface TestDetailResponseData extends ResponseData {
  data: TestDetail;
}
