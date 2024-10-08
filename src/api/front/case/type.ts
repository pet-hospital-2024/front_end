export interface ResponseData {
  code: number;
  message: string;
}

export interface Disease {
  disease_id: string;
  department_id: string;
  disease_name: string;
  department:string | null;
}

//科室的数据
export interface Category {
  department_id: string;
  department_name: string;
  diseases?: Disease[];
}

//科室数组类型
export type CategoryArr = Category[];

//获取科室和疾病接口返回的数据
export interface CategoryResponseData extends ResponseData {
  data: CategoryArr;
}

//根据疾病返回病例接口
export interface CaseGenInfo{
  case_id: string;
  case_name: string;
  case_introduction: string;
}

export type CaseList = CaseGenInfo[];

//根据疾病返回病例列表
export interface CaseListResponseData extends ResponseData {
  data: CaseList;
}

//详细病例信息
export interface CaseDetailInfo {
  case_id: string;
  case_name: string;
  case_examination: string;
  case_result: string;
  case_treatment: string;
  case_medicine: string;
  case_cost: string;
  case_introduction: string;
  disease_id: string;
  department_id: string;
}

export interface CaseDetailInfoResponseData extends ResponseData {
  data: CaseDetailInfo;
}

// interface MediaItem {
//   case_id: string;
//   media_id: string;
//   media_url: string;
//   media_name: string;
//   media_type: 'image' | 'video';
//   category: string;
// }

// export type MediaArr=MediaItem[];

export interface MediaResponseData extends ResponseData {
  data:Array<string>;
}