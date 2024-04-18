export interface ResponseData {
  code: number;
  message: string;
}

//岗位职责
interface DutyData {
  location_id: string;
  location_name: string;
  learn_duty: string;
  learn_text: string;
}

export type DutyArr = DutyData[];

export interface DutyResponseData extends ResponseData {
  data: DutyArr;
}

//工作流程
interface ProcessData {
  process_order: string;
  process_name: string;
}

export type ProcessArr = ProcessData[];

export interface ProcessResponseData extends ResponseData {
  data: ProcessArr;
}

//模拟操作
interface LocationData {
  location_id: string;
  location_name: string;
  location_introduction: string;
}

export type LocationArr = LocationData[];

export interface LocationResponseData extends ResponseData {
  data: LocationArr;
}
