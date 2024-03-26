<template>
    <div class="container">
        <div class="title">
          <h1>病例学习</h1>
          <!-- <h3>描述</h3> -->
        </div>
        <List></List>
    </div>
</template>

<script setup lang="ts">
import List from "./directory/index.vue"
// import { ref } from 'vue'

</script>

<style scoped lang="scss">
.container{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: rgb(212, 246, 233);

  .title{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    h1{
      color:gray;
      font-size: 40px;
    }
    h3{
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
</style>