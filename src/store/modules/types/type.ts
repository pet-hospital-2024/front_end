import type { RouteRecordRaw } from "vue-router";

interface UserInfo {
  username?: string;
  identity?: string;
  user_id?: string;
  exp?:number;
}
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  // username:string,
  // identity:string,
  userData: UserInfo | null;
}
