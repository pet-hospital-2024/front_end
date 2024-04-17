export interface ResponseData {
  code: number;
  message: string;
}

export interface learnItem {
  learn_item_url: string;
  learn_item_name: string;
  learn_text: string;
}

export interface PanoramaResponseData extends ResponseData {
  data: learnItem;
}
