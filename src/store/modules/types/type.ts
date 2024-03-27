import type { RouteRecordRaw } from "vue-router";
import type { CategoryArr } from "@/api/front/case/type";
export interface UserState{
    token:string|null;
    menuRoutes:RouteRecordRaw[],
    username:string,
    identity:string,
}

export interface FrontCaseState{
    categoryArr:CategoryArr;
}