<template>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="岗位责任" name="first">
          <el-table :data="dutyData" style="width: 100%">
            <el-table-column prop="depart" label="科室" width="300" />
            <el-table-column prop="duty" label="职责" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作流程" name="second">
          <div class="process-list">
            <ul>
            <li v-for="(item, index) in processData" :key="index">
              <span>{{ item.id }}.</span>
              <span>{{ " "+item.content }}</span>
            </li>
          </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模拟操作" name="third">
          <el-table :data="opData" style="width: 100%">
            <el-table-column prop="depart" label="科室" width="300" />
            <el-table-column prop="detail" label="详情" />
            <el-table-column prop="operation" label="操作" width="200">
              <template #default>
                <el-button plain type="primary" size="default"
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
import { ref } from "vue";
// import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event);
// };

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
  padding: 20px 40px;
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
