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
    // 从状态管理获取最新的身份信息
    await userStore.userInfo();
    const identity = userStore.identity;
    if (to.path === "/login") {
      console.log(identity);
      // 用户已登录，尝试访问登录页时，根据用户身份重定向
      next(identity === "user" ? "/front" : "/back");
      // next("/front");
      return;
    } else {
      if (identity === "user" && to.path.startsWith("/front")) {
        // 允许用户身份为"user"访问"/front"及其子路由
        next();
        return;
      } else if (identity !== "user" && to.path.startsWith("/back")) {
        // 允许其他身份访问"/back"及其子路由
        next();
        return;
      } else {
        // 如果访问不匹配，则重定向到合适的路径
        next(identity === "user" ? "/front" : "/back");
        return;
      }
    }
  } else {
    // 用户未登录，重定向到登录页
    if (to.path !== "/login") {
      next({ path: "/login", query: { redirect: to.path } });
      return;
    } else {
      next(); // 允许访问登录页
    }
  }
});
// 全局后置守卫

router.afterEach((route) => {
  nprogress.done();
});
