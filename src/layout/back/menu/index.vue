<!--对Menu组件进行封装，@menuList:路由信息，在routes.ts中定义-->
<!--未使用element-plus的icon，详情教学见P24,P25,P41-->
<script setup lang="ts">
defineProps(['menuList']);
import { useRouter } from 'vue-router';
const $router=useRouter();
const goRoute=(vc:any)=>{
    $router.push(vc.index);
};
</script>
<script lang="ts">
export default{
    name:"Menu"
}
</script>
<template>
    <template v-for="(item,index) in menuList" :key="item.path" >
        <!--没有子路由-->
        <!--不使用v-show是因为v-show初始会渲染，有性能损耗-->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute" >
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
         <!-- 有子路由但只有一个 /home -->
        <template
      v-if="item.children && item.children.length === 1 && item.path === '/back'"
    >
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute">
        <template #title>
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
        <template v-if="item.children && item.children.lenth == 1 && item.path!=='/back'">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!--有多个子路由-->
        <el-sub-menu v-if="item.children && item.children.length > 1 && item.path!=='/front'" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>
<style lang="scss" scoped></style>

