<template>
  <div class="content">
    <div class="caseCard">
      <el-tabs type="border-card">
        <el-tab-pane label="接诊">
          <div class="container">
            <h2 style="margin-top: 10px">基本情况</h2>
            <p>
              这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div v-for="(url, index) in imgUrls" :key="url" class="block">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="imgUrls"
                  :initial-index="index"
                  fit="fill"
                >
                </el-image>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="container">
            <h2>视频</h2>
            <div class="videoContainer">
              <div v-for="(url, index) in videoUrls" :key="url" class="videoBlock">
                <video width="100%" controls>
                  <source :src="url" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="病例检查">
          <div class="container">
            <h2 style="margin-top: 10px">基本情况</h2>
            <p>
              这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div v-for="(url, index) in imgUrls" :key="url" class="block">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="imgUrls"
                  :initial-index="index"
                  fit="fill"
                >
                </el-image>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="container">
            <h2>视频</h2>
            <div class="videoContainer">
              <div v-for="(url, index) in videoUrls" :key="url" class="videoBlock">
                <video width="100%" controls>
                  <source :src="url" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="诊断结果">
          <div class="container">
            <h2 style="margin-top: 10px">基本情况</h2>
            <p>
              这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div v-for="(url, index) in imgUrls" :key="url" class="block">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="imgUrls"
                  :initial-index="index"
                  fit="fill"
                >
                </el-image>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="container">
            <h2>视频</h2>
            <div class="videoContainer">
              <div v-for="(url, index) in videoUrls" :key="url" class="videoBlock">
                <video width="100%" controls>
                  <source :src="url" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="治疗方案">
          <div class="container">
            <h2 style="margin-top: 10px">基本情况</h2>
            <p>
              这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍这是一段病例基本情况介绍
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div v-for="(url, index) in imgUrls" :key="url" class="block">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="imgUrls"
                  :initial-index="index"
                  fit="fill"
                >
                </el-image>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="container">
            <h2>视频</h2>
            <div class="videoContainer">
              <div v-for="(url, index) in videoUrls" :key="url" class="videoBlock">
                <video width="100%" controls>
                  <source :src="url" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
const imgUrls = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
const videoUrls = [
  '/xueya.mp4',
  '/xueya.mp4',
];
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  .caseCard {
    width: 90%;
    margin-top: 10px;
    height: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-left: 30px;
    h2 {
      font-size: 24px;
      font-weight: bold;
    }
    p {
      margin-top: 20px;
      line-height: 1.5;
    }
  }

  .block {
    padding: 20px 0 0 0;
    display: inline-block;
    width: 32%;
    box-sizing: border-box;
    margin-right: 1%;
  }

  .videoContainer {
    margin-bottom: 20px;
  }

  .videoBlock{
    padding: 20px 0 0 0;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    margin-right: 1%;
  }
}
</style>
