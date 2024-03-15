import { createApp } from "vue";
import App from "./App.vue";
import "@/style/reset.scss";

// import HospitalTop from "@/components/hospital_top/index.vue";
//@ts-ignore
import Modify from "@/components/modify/index.vue";
import router from "@/router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import pinia from "@/store";

// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);

//加载组件
// app.component("HospitalTop", HospitalTop);
app.component("Modify", Modify);

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
//全局使用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount("#app");
