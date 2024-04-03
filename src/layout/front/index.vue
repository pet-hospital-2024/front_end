<template>
  <div class="layout_container">
    <Top></Top>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from "./hospital_top/index.vue";
import Main from "./main/index.vue";
</script>

<script lang="ts">
export default {
  name: "Layout_Front",
};
</script>

<style scoped lang="scss">
.layout_container {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(230, 230, 230);
  //   direction:column;

  //   .layout_tabber {
  //     width: 100%;
  //     top: 0px;
  //   }

  .layout_main {
    margin-top: 8vh;
    // width: 80vw;
    width: 100%;
    height: 92vh;
    background-color: rgb(255, 255, 255);
  }
}
</style>
