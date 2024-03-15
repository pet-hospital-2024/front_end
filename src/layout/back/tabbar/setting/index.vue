<!--封装设置组件-->
<template>
    <el-avatar :icon="UserFilled" style="margin-right: 15px;" :size="35"/>
    <!--下拉菜单-->
    <el-dropdown>
        <span class="el-dropdown-link" style="cursor:pointer">
            <!--动态加载username-->
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <!--退出登录逻辑-->
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import useBackLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useBackLayoutSettingStore();
//获取用户相关小仓库
import useUserStore from '@/store/modules/user';
let userStore=useUserStore();
//退出登录路由跳转引入
import { useRouter } from 'vue-router';
let $router=useRouter();

//退出登录@click=logout方法
const logout=()=>{
    //1.向server发请求，logout接口，token无效化
    //
    //

    //2.仓库中用户信息清空
    userStore.userLogout();

    //3.跳转到login界面
    $router.push({path:'/login'});
}
</script>
<script lang="ts">
export default{
    name:'Setting',
}
</script>
