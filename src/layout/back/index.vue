<template>
    <div class="layout_container">
        <!--折叠菜单：class-->
        <div class="layout_slider" :class="{fold:LayoutSettingStore.fold?true:false}">
            <!--左侧菜单-->
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <!--el-menu：background-color：16进制 -->
                <!--UI优化详见element-plus Menu组件-->
                <el-menu :collapse="LayoutSettingStore.fold?true:false" :default-active="$route.path" background-color="rgb(152, 181, 172)
" active-text-color="#666666" text-color="white" :router="true">
                    
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
            </div>
        <div class="layout_tabbar" :class="{fold:LayoutSettingStore.fold?true:false}">
            <!--顶部导航-->
            <!--layout组件顶部导航栏-->
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold:LayoutSettingStore.fold?true:false}">
            <!--主页面-->
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
//获取用户小仓库
import useUserStore from "@/store/modules/user";

let userStore=useUserStore();
// 获取路由对象
//获取菜单折叠状态控制小仓库
import useBackLayoutSettingStore from "@/store/modules/setting";
let LayoutSettingStore=useBackLayoutSettingStore();

import {useRoute} from 'vue-router';
let $route=useRoute();



</script>
<script lang="ts">
export default{
    name:'backLayout',
}
</script>
<style scoped lang="scss">

.layout_container{
    width:100%;
    height: 100vh;
    
    //background-color: red;
    .layout_slider{
        //slider-width=260px
        width: 260px;
        height: 100vh;
        background-color:rgb(152, 181, 172);
        overflow: hidden;//存在问题：折叠时字体展示
        transition:all 0.6s;
        .scrollbar{
            width: 100%;
            //scrollbar-height=100%vh-logo-height
            height: calc(100vh - 50px);
            .el-menu{
                border-right:none;
            }//美观，消除右侧边框
        }
        &.fold{
            width: 62px;//折叠后左侧显示的宽度
            
        }
    }
    .layout_tabbar{
        position: fixed;
        //tabbar-height=50px
        width: calc(100% - 260px);
        height:50px;
        //background-color: green;
        left:260px;
        top:0;
        transition:all 0.6s;
        &.fold{
            //tabbar折叠后对应伸缩，width为100vw-fold宽度（50px）
            width: calc(100vw - 62px);
            left:62px;
        }
    }//padding=20px,展示过长内容出现滚动条 overflow=auto
    .layout_main{
        position:absolute;
        width: calc(100% - 260px);
        height: calc(100vh - 50px);
        //background-color:yellow;
        left:260px;
        top:50px;
        padding: 20px;
        overflow: auto;
        transition: all 0.6s;
        &.fold{
            //应与tabbar相同
            width: calc(100vw - 62px);
            left:62px;
            
        }
    }
    

}

</style>