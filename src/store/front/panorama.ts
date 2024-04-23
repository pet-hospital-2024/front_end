import { defineStore } from "pinia";
import type {
  PanoramaResponseData,
  learnItem,
} from "@/api/front/panorama/type";
import { reqLearnItem } from "@/api/front/panorama/index";

let usePanoramaStore = defineStore("panorama", {
  state: () => {
    return {
      role_id: "1",
      itemVisibility: false,
      learnItem: {
        learn_item_url: "",
        learn_item_name: "",
        learn_text: "",
      },
    };
  },
  actions: {
    show() {
      this.itemVisibility = true;
    },
    async getLearnItem(location_id: string, role_id: string) {
      // console.log(111);
      let res: PanoramaResponseData = await reqLearnItem(location_id, role_id);
      console.log(res);
      if (res.code == 1) {
        this.learnItem = res.data;
        console.log(res.data);
      }
    },
  },
});

export default usePanoramaStore;
