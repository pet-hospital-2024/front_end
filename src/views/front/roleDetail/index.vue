<template>
  <el-page-header
      :icon="ArrowLeft"
      @back="goBack"
      style="margin: 15px 0 0 30px"
    >
      <template #content>
        <span class="title">{{ roleName(role) }} </span>
      </template>
    </el-page-header>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="岗位责任" name="first">
          <el-table :data="useStore.dutyListArr" style="width: 100%">
            <el-table-column prop="location_name" label="科室" width="300" />
            <el-table-column prop="learn_duty" label="职责" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作流程" name="second">
          <div class="process-list">
            <ul>
            <li v-for="(item, index) in useStore.processListArr" :key="index">
              <span>{{ item.process_order }}.</span>
              <span>{{ " "+item.process_name }}</span>
            </li>
          </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模拟操作" name="third">
          <el-table :data="useStore.locationListArr" style="width: 100%">
            <el-table-column prop="location_name" label="科室" width="300" />
            <el-table-column prop="learn_text" label="详情" />
            <el-table-column prop="location_id" label="操作" width="200">
              <template #default="{row}">
                <el-button plain type="primary" size="default" @click="goRoom(row.location_id,role)"
                  >实景操作</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter,useRoute } from "vue-router";
let $router = useRouter();
let $route = useRoute();
import useFrontRoleStore from "@/store/front/role";
import usePanoramaStore from "@/store/front/panorama";

let useVRStore = usePanoramaStore();
let useStore=useFrontRoleStore();

const activeName = ref("first");

let role=$route.query.role_id as string;

const roleName = ((role:string) => {
  switch (role) {
    case "1":
      return "兽医";
    case "2":
      return "医助";
    case "3":
      return "前台";
    default:
      return "未知职位";
  }
});

onMounted(async() => {

  // console.log(role);
  await useStore.getDutyList(role);
  await useStore.getProcessList(role);
  await useStore.getLocationList(role);
});

const goBack = () => {
  // $router.replace({ path: "/front/study" });
  $router.go(-1);
};

const map = new Map([
  ["6", "平面012"],
  ["2", "平面004"],
  ["5", "平面011"],
  ["7", "平面001"],
  ["8", "平面003"],
  ["9", "平面006"],
  ["1", "平面002"],
]);

const goRoom = (location_id:string,role:string) => {
  // console.log(location_id,role);
  useVRStore.role_id=role;
  $router.push({
    path: "/front/vr",
    query: {
      key: map.get(location_id),
    },
  });
}

const dutyData = [
  {
    depart: "111",
    duty: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
  },
  {
    depart: "111",
    duty: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
  {
    depart: "111",
    duty: "我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好我不好",
  },
];

const opData = [
  {
    depart: "111",
    detail: "111",
  },
];

const processData = [
  {
    id: "111",
    content: "222",
  },
  {
    id: "111",
    content: "222",
  },
  {
    id: "111",
    content: "222",
  },{
    id: "111",
    content: "222",
  },
]
</script>

<style scoped>
.container {
  padding: 20px 60px;
  /* width: 90%; */
  li{
    font-size: 24px;
    margin-bottom: 10px;
  }
}

.title{
  font-size: 16px;
  font-weight: 550;
}

::v-deep .el-tabs__content {
  height: 90vh;
  /* padding: 32px; */
  color: #6b778c;
  font-size: 24px;
  /* font-weight: 600; */

  .process-list {
  margin: 20px;
  line-height: 1.5;
}
}

::v-deep .el-tabs__item {
  color: #6b778c;
  opacity: 0.5;
}

/**选中 */
::v-deep .el-tabs__item.is-active {
  color: rgb(0, 0, 0);
  opacity: 1;
}

/**悬浮 */
::v-deep .el-tabs__item:hover {
  color: rgb(0, 0, 0);
  cursor: pointer;
  opacity: 1;
}

/*去下划线 */
::v-deep .el-tabs__nav-wrap::after {
  position: static !important;
}

/* 下划线颜色 */
::v-deep .el-tabs__active-bar {
  background-color: rgb(0, 0, 0);
}
</style>
