<template>
    <div class="logo">
        <img src="../../../../public/layout/logo.png" alt="logo.png">
        <p>虚拟宠物医院</p>
    </div>
</template>
<script lang="ts">
export default{
    name:'Logo',
}
</script>
<style scoped lang="scss">
.logo{

    width: 100%;
    height: 50px;
    //flex 布局，居中
    display: flex;
    align-items: center;
    padding: 20px;
    img{
        width: 40px;
        height: 40px;
    }
    p{
        font-size: 20px;
        margin: 10px;
    }
}
</style>