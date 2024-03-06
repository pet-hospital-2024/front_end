import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { LoginData, LoginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
//用户小仓库
let useUserStore = defineStore("User", {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    };
  },
  actions: {
    async userLogin(data: LoginData) {
      let result: LoginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data.token as string;
        SET_TOKEN(result.data.token as string);
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      } 
    },
  },
  getters: {},
});

export default useUserStore;
