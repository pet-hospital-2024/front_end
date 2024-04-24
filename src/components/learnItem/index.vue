<template>
  <div>
    <el-dialog v-model="useStore.itemVisibility" draggable style="padding: 20px 30px;">
      <div class="container">
        <h2 style="margin-top: 10px">职责说明</h2>
        <p>
          {{ useStore.learnItem.learn_text }}
        </p>
      </div>
      <el-divider />
      <div class="container">
        <h2>教学视频</h2>
        <div class="videoContainer">
          <video width="100%" controls>
            <source :src="url" type="video/mp4" />
          </video>
        </div>
      </div>
      <!-- <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="useStore.itemVisibility = false">
            关闭
          </el-button>
        </div>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import usePanoramaStore from "@/store/front/panorama";
let useStore = usePanoramaStore();

const url='http://wxl475.cn:9000/syf/1713935793481_宠物医院宣传模板.mp4'
</script>

<script lang="ts">
export default {
  name: "learnItem",
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    // margin-left: 30px;
    h2 {
      font-size: 24px;
      font-weight: bold;
    }
    p {
      font-size: 16px;
      margin-top: 20px;
      line-height: 1.5;
    }
  }

  .videoContainer {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  // .videoBlock {
  //   padding: 20px 0 0 0;
  //   display: inline-block;
  //   width: 49%;
  //   box-sizing: border-box;
  //   margin-right: 1%;
  // }
</style>
