<template>
  <el-page-header
    :icon="ArrowLeft"
    @back="goBack"
    style="margin: 15px 0 0 30px"
  >
    <template #content>
      <span class="title"> </span>
    </template>
  </el-page-header>
  <div class="content">
    <h1 style="color: rgb(143, 162, 143);">{{ useStore.caseDetail?.case_name }}</h1>
    <div class="caseCard">
      <el-tabs type="border-card" @tab-change="getList">
        <el-tab-pane style="color: rgb(114, 114, 114)">
          <template #label>
            <span class="custom-tabs-label">
              <!-- <el-icon><calendar /></el-icon> -->
              <span style="color: rgb(121, 176, 137);;">接诊</span>
            </span>
          </template>
          <div class="container">
            <h2 style="margin-top: 10px">基本情况</h2>
            <p>
              {{ useStore.caseDetail?.case_introduction }}
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div
                v-for="(url, index) in useStore.pictureList"
                :key="url"
                class="block"
              >
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
              <div
                v-for="(url, index) in useStore.videoList"
                :key="url"
                class="videoBlock"
              >
                <video width="100%" controls>
                  <source :src="url" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane style="color: rgb(114,114,114);">
          <template #label>
            <span class="custom-tabs-label">
              <span style="color: rgb(121, 176, 137);">病例检查</span>
            </span>
          </template>
          <div class="container">
            <h2 style="margin-top: 10px">检查情况</h2>
            <p>
              {{ useStore.caseDetail?.case_examination }}
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div
                v-for="(url, index) in useStore.pictureList"
                :key="url"
                class="block"
              >
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
              <div
                v-for="(url, index) in useStore.videoList"
                :key="url"
                class="videoBlock"
              >
                <video width="100%" controls>
                  <source :src="url" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane style="color: rgb(114,114,114);">
          <template #label>
            <span class="custom-tabs-label">
              <span style="color: rgb(121, 176, 137);">诊断结果</span>
            </span>
          </template>
          <div class="container">
            <h2 style="margin-top: 10px">诊断结果</h2>
            <p>
              {{ useStore.caseDetail?.case_result }}
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div
                v-for="(url, index) in useStore.pictureList"
                :key="url"
                class="block"
              >
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
              <div
                v-for="(url, index) in useStore.videoList"
                :key="url"
                class="videoBlock"
              >
                <video width="100%" controls>
                  <source :src="url" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="治疗方案" style="color: rgb(114,114,114);">
          <template #label>
            <span class="custom-tabs-label">
              <span style="color: rgb(121, 176, 137);">治疗方案</span>
            </span>
          </template>
          <div class="container">
            <h2 style="margin-top: 10px">治疗方案</h2>
            <p>
              {{ useStore.caseDetail?.case_treatment }}
            </p>
            <el-divider />
            <h2>使用药物</h2>
            <p>
              {{ useStore.caseDetail?.case_medicine }}
            </p>
            <el-divider />
            <h2>费用</h2>
            <p>
              {{ useStore.caseDetail?.case_cost }}
            </p>
          </div>
          <el-divider />
          <div class="container">
            <h2>照片</h2>
            <div class="imgContainer">
              <div
                v-for="(url, index) in useStore.pictureList"
                :key="url"
                class="block"
              >
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
              <div
                v-for="(url, index) in useStore.videoList"
                :key="url"
                class="videoBlock"
              >
                <video width="100%" controls>
                  <source :src="url" type="video/mp4" />
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
import useFrontCaseStore from "@/store/front/case";
import { ArrowLeft } from "@element-plus/icons-vue";
import Tabs from "element-plus/es/components/tabs/src/tabs";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
let useStore = useFrontCaseStore();
let $router = useRouter();
let $route = useRoute();
onMounted(() => {
  useStore.getCaseText($route.query.case_id as string);
  useStore.getMediaList($route.query.case_id as string, "Consultation");
});
const goBack = () => {
  // $router.replace({ path: "/front/study" });
  $router.go(-1);
};

const getList = (tab: any) => {
  console.log(tab);
  if (tab == 0) {
    useStore.getMediaList($route.query.case_id as string, "Consultation");
  }
  if (tab == 1) {
    useStore.getMediaList($route.query.case_id as string, "Examination");
  }
  if (tab == 2) {
    useStore.getMediaList($route.query.case_id as string, "Result");
  }
  if (tab == 3) {
    useStore.getMediaList($route.query.case_id as string, "Treatment");
  }
};

const imgUrls = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
const videoUrls = ["/xueya.mp4", "/xueya.mp4"];
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 40px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: 600;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
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
      font-size: 16px;
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

  .videoBlock {
    padding: 20px 0 0 0;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    margin-right: 1%;
  }
}
</style>
