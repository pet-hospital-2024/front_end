<template>
  <div class="menu-container">
    <button @click="toggleMenu">{{ menuItems[selectedItem] }}</button>
    <ui class="menu" v-show="isOpen">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ selected: selectedItem === index }"
        @click="selectItem(index)"
      >
        {{ item }}
      </li>
    </ui>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import usePanoramaStore from "@/store/front/panorama";
let useStore=usePanoramaStore();

const isOpen = ref(false);
const selectedItem = ref(0); // 默认选择第一个菜单项
const menuItems = ref(["兽医", "医助", "前台"]); // 菜单项
const selectedRole = ref(1);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function selectItem(index: number) {
  selectedItem.value = index;
  useStore.role_id=index+1;
  isOpen.value = false;
}
</script>

<script lang="ts">
export default {
  name: "pullUpMenu",
};
</script>

<style scoped lang="scss">
.menu-container {
  // position: fixed;
  // // bottom: 0;
  right: 0;
  // background-color: white;
  // border-top: 1px solid #ccc;
  // transition: transform 0.3s ease-in-out;
  position: fixed;
  margin-right: 40px;
  margin-top: 20px;
  // display: inline-block;
}

.menu-container button {
  background: rgba($color: #ffffff, $alpha: 0.3);
  padding: 0;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  // font-size: inherit;
  // font-weight: inherit;
  min-width: 100px;
  height: 30px;
}

// .menu-container.open .menu {
//   transform: translateY(0%);
// }

.menu {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 30px);
  background-color: rgba($color: #f9f9f9, $alpha: 0.6);;
  min-width: 100px;
  // max-height: 300px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.menu li {
  padding: 5px 16px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  // height: 30px;
}

.menu li:hover {
  background-color: #bcbcbc;
}

// .selected {
//   background-color: #007bff; /* 蓝色背景表示选中状态 */
//   color: white;
// }
</style>
