import { defineStore } from "pinia";
import { reqGetAIResponse } from "@/api/front/ai";
import { nextTick } from "vue";
import { fetchEventSource } from "@microsoft/fetch-event-source";

import type { FrontAIState } from "./types/type";

const useFrontAIStore = defineStore("FrontAI", {
  state: (): FrontAIState => {
    return {
      messageArr: [],
      nextMessageId: 1,
      isSending: false,
      eventSource: null,
    };
  },
  actions: {
    loadMessages() {
      const savedMessages = sessionStorage.getItem("chat-messages");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        this.messageArr = parsedMessages.messages;
        this.nextMessageId = parsedMessages.nextMessageId;
      }
    },
    saveMessages() {
      const data = {
        messages: this.messageArr,
        nextMessageId: this.nextMessageId,
      };
      sessionStorage.setItem("chat-messages", JSON.stringify(data));
    },
    // async sendMessage(text: string,token: string) {
    //   try {
    //     // const response = await reqGetAIResponse({ query: text });
    //     // if (response && response.data) {
    //     //   this.messageArr.push({
    //     //     id: this.nextMessageId++,
    //     //     text: response.data,
    //     //     isMe: false,
    //     //   });
    //     // }
    //     const query={
    //         "query":text,
    //     }
    //     const ctrl = new AbortController() 
    //     let concatContent = "";
    //     let index=0;
    //     await fetchEventSource("/api/ai", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token,
    //       },
    //       body: JSON.stringify(query),
    //       openWhenHidden: true, 
    //       onmessage:(event)=> {
    //         console.log("返回数据",event);
    //         if(event.data){
    //           const data=event.data
    //           console.log(data);
    //           concatContent+=data;
    //           if(index==0){
    //             this.messageArr.push({
    //               id: this.nextMessageId++,
    //               text: concatContent,
    //               isMe: false,
    //           });
    //           }else{
    //             this.messageArr[this.messageArr.length - 1].text = concatContent;
    //           }
    //           index++;
    //         }
    //       },
    //       onclose() {
    //         // 数据返回结束时触发
    //         console.log("关闭连接成功");
    //       },
    //       onerror(err) {
    //         console.log("eventSource error");
    //         ctrl.abort()
    //         throw err
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Failed to get AI response:", error);
    //     this.messageArr.push({
    //       id: this.nextMessageId++,
    //       text: "Error: Failed to get response from AI.",
    //       isMe: false,
    //     });
    //   } finally {
    //     this.isSending = false;
    //     this.saveMessages();
    //     await nextTick();
    //   }
    // },
  },
});

export default useFrontAIStore;
