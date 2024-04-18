import { defineStore } from "pinia";

let useChatStore = defineStore("chatBox", {
  state: () => {
    return {
      isChatVisible: false, // 控制 chat 组件的可见性
      isAIVisible: true, // 控制 AIassistant组件的可见性
    };
  },
  actions: {
    change() {
      this.isChatVisible = !this.isChatVisible;
    },
    hide(){
      this.isAIVisible=false;
    }
  },
});

export default useChatStore;
