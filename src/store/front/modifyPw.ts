// stores/useModifyStore.js
import { defineStore } from "pinia";

let useModifyStore = defineStore("modify", {
  state: () => {
    return { 
      isVisible: false, // 控制 modify 组件的可见性
    }; 
  },
  actions: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
  },
});

export default useModifyStore;
