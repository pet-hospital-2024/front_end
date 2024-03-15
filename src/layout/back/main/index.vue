<!--封装router-view，Main主题部分展示内容-->
<!--增加过渡动画-->
<template>
        <!--组件出口位置-->
        <router-view v-slot="{Component}">
            <!--渲染一级路由子组件的路由-->
            <Transition name="fade">
                <component :is="Component"/>
            </Transition>
        </router-view>

</template>     
<script setup lang="ts">

</script>
<script lang="ts">
export default{
    name:'main'
}
</script>
<!--添加过渡动画-->
<style scoped>
.fade-enter-from{
    opacity: 0;
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
}
</style>