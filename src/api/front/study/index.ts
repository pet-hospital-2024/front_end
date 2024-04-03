import request from "@/utils/request";
import type{ DutyResponseData,ProcessResponseData,LocationResponseData } from "./type";

enum API{
    GETDUTY_URL="/learn/getDuty",
    GETPROCESS_URL="/learn/getProcess",
    GETLOCATION_URL="/learn/getLocation",
}

//岗位职责
export const reqGetDuty=(role_id:string)=>
    request.get<any,DutyResponseData>(API.GETDUTY_URL,{params:{role_id}});

//工作流程
export const reqGetProcess=(role_id:string)=>
    request.get<any,ProcessResponseData>(API.GETPROCESS_URL,{params:{role_id}});

//模拟操作
export const reqGetLocation=()=> 
    request.get<any,LocationResponseData>(API.GETLOCATION_URL);