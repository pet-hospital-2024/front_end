import { Vector3 } from 'three';

export const rooms = [
  {
    name: "前台",
    key: "平面012",
    map: new URL("/assets/reception-desk.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(30, 0, -50),
    label: new Vector3(),
    interactivePoints: [],
  },
  {
    name: "诊室",
    key: "平面004", //005
    map: new URL("/assets/consulting-room.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(20, 0, -50),
    label: new Vector3(),
    //每个房间的交互点
    interactivePoints: [
      {
        key: "", //交互点的key
        value: "", //交互点名称
        description: "", //交互点描述
        cover: new URL("", import.meta.url).href, //交互点的图标
        position: new Vector3(-6, 2, -8), //交互点的位置
      },
      // ../assets/images/map/objects/.jpg
      {
        key: "",
        value: "",
        description: "",
        cover: new URL("", import.meta.url).href,
        position: new Vector3(-12, 4, 9),
      },
    ],
  },
  {
    //test
    name: "手术室",
    key: "平面011",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(10, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "opertating-table",
        value: "手术台",
        description: "",
        cover: new URL("/assets/images/map/objects/.jpg", import.meta.url).href,
        position: new Vector3(-38, 2, -14),
      },
    ],
  },
  {
    name: "病房",
    key: "平面001", //9、10、8
    map: new URL("/assets/ward.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(0, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "",
        value: "",
        description: "",
        cover: new URL("../assets/images/map/objects/.png", import.meta.url)
          .href,
        position: new Vector3(80, 4, 9),
      },
    ],
  },
  {
    name: "CT",
    key: "平面003",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-10, 0, -50),
    label: new Vector3(),
    interactivePoints: [],
  },
  {
    name: "B超",
    key: "平面006",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href, //b-ultra
    showSwitch: true,
    position: new Vector3(-20, 0, -50),
    label: new Vector3(),
    interactivePoints: [],
  },
  {
    name: "病案室",
    key: "平面002",
    map: new URL("/assets/reception-desk.jpg", import.meta.url).href, //case-room
    showSwitch: true,
    position: new Vector3(-30, 0, -50),
    label: new Vector3(),
    interactivePoints: [],
  },
  {
    name: "药房",
    key: "平面007",
    map: new URL("/assets/consulting-room.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-40, 0, -50),
    label: new Vector3(),
    interactivePoints: [],
  },
];