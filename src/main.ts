import { createApp } from "vue";
import App from "./App.vue";
import "@/style/reset.scss";
//英文语言包
import i18n from '@/language/'
// import HospitalTop from "@/components/hospital_top/index.vue";

import Modify from "@/components/modify/index.vue";
import AIassistant from "@/components/AIassistant/index.vue";
//@ts-ignore
import ChatBox from "@/components/chatBox/index.vue";
import router from "@/router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import pinia from "@/store";

// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);
app.use(i18n);
//加载组件
// app.component("HospitalTop", HospitalTop);
app.component("Modify", Modify);
app.component("AIassistant", AIassistant);
app.component("ChatBox",ChatBox);

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
//全局使用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//引入路由鉴权文件
import './permission';

app.mount("#app");
