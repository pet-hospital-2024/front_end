import request from "@/utils/request";
import type { AIResponseData, queryData } from "./type";

enum API {
    GETAIRESPONSE_URL='/ai'
}

export const reqGetAIResponse = (query:queryData) =>
    request.post<any,AIResponseData>(API.GETAIRESPONSE_URL,query);