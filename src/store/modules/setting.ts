//关于backLayout组件配置小仓库
import { defineStore } from "pinia";

let useBackLayoutSettingStore = defineStore('BackSettingStore',{
    state:()=>{
        return {
            //控制菜单折叠还是收起的变量
            fold:false,
        }
    }
});
export default useBackLayoutSettingStore;