import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, } from '@/api/user'
import type { LoginData, LoginResponseData, UserInfoResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量路由
import { constantRoute } from "@/router/routes";

import {jwtDecode} from 'jwt-decode';

//用户小仓库
let useUserStore = defineStore("User", {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes:constantRoute,//仓库存储菜单生成需要数组（路由）
      // username:'',//存储用户姓名和头像
      // identity:''//存储用户身份
      userData:{},
    };
  },
  actions: {
    async userLogin(data: LoginData) {
      let result: LoginResponseData = await reqLogin(data);
      console.log(result);
      if (result.code == 1) {
        this.token = result.data as string;
        const decoded = jwtDecode(this.token); // 使用jwtDecode解码
        this.userData = decoded;
        console.log(this.userData.username);
        SET_TOKEN(this.token);
        // //本地持久化存储
         //localStorage.setItem("TOKEN",result.data);
        return "ok";
      } else {
        console.log(result.data);
        console.log(result.code);
        return Promise.reject(new Error(result.message));
      } 
    },
    async getUserIdentity(){
      const decoded = jwtDecode(this.token as string); // 使用jwtDecode解码
      this.userData = decoded;
      // return this.userData?.identity;
    },
    //获取用户信息的方法

    //退出登录
    userLogout(){
      //退出登录接口（or mock 接口）：通知服务器本地用户唯一标识符失效
      this.token='';
      this.userData={};
      // this.username='';
      // localStorage.removeItem('TOKEN');
      REMOVE_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;

