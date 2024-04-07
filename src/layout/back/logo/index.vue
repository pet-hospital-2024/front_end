<template>
    <div class="logo">
        <img src="../../../../public/layout/pet_logo.png" alt="logo.png">
        <span class="title">虚拟宠物医院</span>
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
    align-items: center;
    font-weight: 700;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    padding-left: 17px;
    img{
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 10px;
    }
    .title{
        display: inline-block;
        height: 32px;
        margin: 2px 0 0 18px;
        overflow: hidden;
        font-size: 18px;
        font-weight: 600;
        line-height: 32px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>