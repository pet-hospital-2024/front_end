import { defineStore } from "pinia";

let useChatStore = defineStore("chatBox", {
  state: () => {
    return {
      isVisible: false, // 控制 chat 组件的可见性
    };
  },
  actions: {
    change() {
      this.isVisible = !this.isVisible;
    },
  },
});

export default useChatStore;
