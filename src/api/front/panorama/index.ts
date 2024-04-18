import request from "@/utils/request";
import type { PanoramaResponseData } from "./type";

enum API{
    LEARNINPANORAMA_URL="/learn/getItem",
}

export const reqLearnItem = (location_id:string,role_id:string) =>
    request.get<any,PanoramaResponseData>(API.LEARNINPANORAMA_URL,{params:{location_id,role_id}});