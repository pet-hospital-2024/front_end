import router from "@/router";
//@ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "./store";
import useUserStore from "./store/modules/user";
nprogress.configure({ showSpinner: false });
let userStore = useUserStore(pinia);
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  //document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start();
  let token = userStore.token;
  if (token) {
    if (to.path === "/login") {
      console.log(token);
      // 用户已登录，尝试访问登录页时，根据用户身份重定向
      await userStore.userInfo();
      const identity = userStore.identity; // 从状态管理获取最新的身份信息
      console.log(identity);
      next(identity === "user" ? "/front" : "/back");
      // next("/front");
    } else {
      if (!userStore.username) {
        // 如果 token 存在但用户名未加载，尝试加载用户信息
        try {
          await userStore.userInfo();
          // 加载成功后，根据最新的身份信息决定是否需要重定向
          next();
        } catch (error) {
          // 错误处理，例如 token 无效
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      } else {
        // 用户名已加载，直接允许访问
        next();
      }
    }
  } else {
    // 用户未登录，重定向到登录页
    if (to.path !== "/login") {
      next({ path: "/login", query: { redirect: to.path } });
    } else {
      next(); // 允许访问登录页
    }
  }
  
});
// 全局后置守卫

router.afterEach((route) => {
  nprogress.done();
});
