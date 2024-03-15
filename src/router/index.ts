import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routes";
export default createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动性:切换路由时滚动条在最顶上
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
