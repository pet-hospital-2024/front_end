<template>
    <div class="layout_container">
        <div class="layout_slider">
            <!--左侧菜单-->
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <!--el-menu：background-color：16进制 -->
                <!--UI优化详见element-plus Menu组件-->
                <el-menu :default-active="$route.path" background-color="#20BBA1" active-text-color="#A0CDCC" text-color="white">
                    
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
            </div>
        <div class="layout_tabbar">
            <!--顶部导航-->
            <!--layout组件顶部导航栏-->
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main">
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
import {useRoute} from 'vue-router';
let $route=useRoute();



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
        background-color:#20BBA1;
        .scrollbar{
            width: 100%;
            //scrollbar-height=100%vh-logo-height
            height: calc(100vh - 50px);
            .el-menu{
                border-right:none;
            }//美观，消除右侧边框
        }
    }
    .layout_tabbar{
        //tabbar-height=50px
        width: calc(100% - 260px);
        height:50px;
        //background-color: green;
        position: fixed;
        left:260px;
        top:0;
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
    }
    

}
</style>