import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, } from '@/api/user'
import type { LoginData, LoginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量路由
import { constantRoute } from "@/router/routes";

//用户小仓库
let useUserStore = defineStore("User", {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes:constantRoute,//仓库存储菜单生成需要数组（路由）
      username:'',//存储用户姓名和头像
      identity:''//存储用户身份
    };
  },
  actions: {
    async userLogin(data: LoginData) {
      let result: LoginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data.token as string;
        SET_TOKEN(result.data.token as string);
        //本地持久化存储
        localStorage.setItem("TOKEN",result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      } 
    },
    //获取用户信息的方法
    async userInfo() {
      let res: any = await reqUserInfo();
      //console.log(res.data.checkUser.username);

      if (res.code === 200) {
        this.username = res.data.checkUser.username as string;
        this.identity = res.data.checkUser.identity as string;
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //退出登录
    userLogout(){
      //退出登录接口（or mock 接口）：通知服务器本地用户唯一标识符失效
      this.token='';
      this.username='';
      localStorage.removeItem('TOKEN');
      REMOVE_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;

