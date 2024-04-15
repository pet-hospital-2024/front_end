export interface ResponseData {
  code: number;
  message: string;
}

export interface AIResponseData extends ResponseData {
  data: string;
}

export interface queryData {
  query: string;
}

export interface Message {
  id: number;
  text: string;
  isMe: boolean;
}

export type MessageArr=Message[];
