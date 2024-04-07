<template>
  <div class="tolList">
    <div class="leftNav">
      <ul>
        <li
          @click="changeIndex(index)"
          v-for="(type, index) in useStore.categoryArr"
          :key="type.department_id"
          :class="{ active: index == currentIndex }"
        >
          {{ type.department_name }}
        </li>
      </ul>
    </div>
    <div class="caseInfo">
      <div
        class="showType"
        v-for="(type, index) in useStore.categoryArr"
        :key="type.department_id"
      >
        <h1 class="cur">{{ type.department_name }}</h1>
        <ul>
          <li
            @click="goCaseList(item.disease_id,item.disease_name)"
            v-for="item in type.diseases"
            :key="item.disease_id"
          >
            {{ item.disease_name }}
          </li>
        </ul>
      </div>
      <div class="space"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useFrontCaseStore from "@/store/front/case";

let useStore = useFrontCaseStore();

onMounted(() => {
  useStore.getDirectory();
});

let $router = useRouter();
//模拟病例数据
// const caseCategories = [
//   {
//     categoryCode: "001",
//     categoryName: "传染病",
//     cases: [
//       { caseCode: "001-1", caseName: "犬瘟热" },
//       { caseCode: "001-2", caseName: "犬细小病毒" },
//       { caseCode: "001-3", caseName: "犬传染性肝炎" },
//       { caseCode: "001-4", caseName: "犬冠状病毒" },
//       { caseCode: "001-5", caseName: "猫泛白细胞减少症" },
//       { caseCode: "001-6", caseName: "猫病毒性病气管炎" },
//       { caseCode: "001-7", caseName: "皮肤真菌感染" },
//     ],
//   },
//   {
//     categoryCode: "002",
//     categoryName: "寄生虫病",
//     cases: [
//       { caseCode: "002-1", caseName: "蛔虫病" },
//       { caseCode: "002-2", caseName: "钩虫病" },
//       { caseCode: "002-3", caseName: "绦虫病" },
//       { caseCode: "002-4", caseName: "球虫病" },
//       { caseCode: "002-5", caseName: "疥螨虫病" },
//       { caseCode: "002-6", caseName: "蚤病" },
//     ],
//   },
//   {
//     categoryCode: "003",
//     categoryName: "内科",
//     cases: [
//       // 根据提供的数据，添加相应的内科病例
//       { caseCode: "003-1", caseName: "口炎" },
//       { caseCode: "003-2", caseName: "肠炎" },
//       // 可以继续添加更多的内科病例...
//     ],
//   },
//   {
//     categoryCode: "004",
//     categoryName: "外产科疾病",
//     cases: [
//       // 根据提供的数据，添加相应的外产科疾病病例
//       { caseCode: "004-1", caseName: "外伤" },
//       { caseCode: "004-2", caseName: "外科感染" },
//       // 可以继续添加更多的外产科疾病病例...
//     ],
//   },
//   {
//     categoryCode: "005",
//     categoryName: "常用手术",
//     cases: [
//       // 根据提供的数据，添加相应的常用手术病例
//       { caseCode: "005-1", caseName: "绝育" },
//       { caseCode: "005-2", caseName: "剖腹产" },
//       // 可以继续添加更多的常用手术病例...
//     ],
//   },
//   {
//     categoryCode: "006",
//     categoryName: "免疫",
//     cases: [
//       // 根据提供的数据，添加相应的免疫病例
//       { caseCode: "006-1", caseName: "犬免疫程序" },
//       { caseCode: "006-2", caseName: "猫免疫程序" },
//     ],
//   },
// ];

//控制类型高亮的响应式数据
let currentIndex = ref<number>(0);
//左侧类型的点击事件
const changeIndex = (index: number) => {
  currentIndex.value = index;
  let allH1 = document.querySelectorAll(".cur");
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const goCaseList = (id: string,name:string) => {
  $router.push({ path: "/front/caseList", query: { disease_id: id,disease_name:name } });
};
</script>

<style scoped lang="scss">
.tolList {
  width: 80%;
  height: 80vh;
  display: flex;
  margin-top: 30px;

  .leftNav {
    width: 100px;
    height: 75%;
    ul {
      height: 100%;
      width: 100%;
      background: white;
      display: flex;
      flex-direction: column;
      li {
        flex: 1;
        text-align: center;
        color: #7f7f7f;
        font-size: 14px;
        line-height: 60px;
        cursor: pointer;

        &.active {
          border-right: 5px solid rgb(147, 192, 154);
          color: rgb(0, 0, 0);
          background: rgb(240, 250, 241);
        }
      }
    }
  }
  .caseInfo {
    flex: 1;
    margin-left: 20px;
    height: 100%;
    overflow: auto;
    padding-bottom: 60vh;
    &::-webkit-scrollbar {
      display: none;
    }
    .showType {
      .cur {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;
        background-color: rgb(248, 248, 248);
        color: #7f7f7f;
        height: 50px;
        font-size: 18px;
        // text-align: center;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        // background:gray;
        // margin-top: 10px;
        margin-bottom: 10px;
        li {
          margin-top: 10px;
          color: #7f7f7f;
          // height: 60px;
          width: 24%;
          line-height: 40px;
          cursor: pointer;
          padding: 0px 30px;
        }
      }
    }
  }
}
</style>
