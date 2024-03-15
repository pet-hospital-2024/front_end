<!--封装设置组件-->
<template>
    <el-icon size="20" style="margin-right:10px"><UserFilled /></el-icon>
    <!--下拉菜单-->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item >退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue/dist/types';


</script>
