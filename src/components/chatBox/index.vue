<template>
  <div>
    <div class="contianer">
      <h1>智能助教</h1>
      <el-divider />
      <div class="chatRoom">

      </div>
      <el-divider />
      <div class="inputArea">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contianer {
  width: 400px;
  height: 500px;
  z-index: 990;
  position: absolute;
  right: 70px;
  bottom: 70px;
  padding: 5px 10px;
  background-color: white;
  border-radius: 20px;
  border: 5px solid rgb(169, 184, 169);
  transition:ease-in-out 1s;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: -10px;
    // font-weight: 600;
  }

  .chatRoom{
    height: 280px;
  }
}
</style>
