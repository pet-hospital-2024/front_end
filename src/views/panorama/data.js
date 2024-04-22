import { Vector3 } from 'three';

export const rooms = [
  {
    name: "前台",
    key: "平面012",
    map: new URL("/assets/reception.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(30, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "",
        value: "接待处",
        description: "",
        cover: new URL("", import.meta.url).href,
        position: new Vector3(20, -5, 20),
      }
    ],
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
        key: "consult", //交互点的key
        value: "诊断", //交互点名称
        description: "医生可在此诊断动物病情", //交互点描述
        cover: new URL("", import.meta.url).href, //交互点的图标
        position: new Vector3(-6, -2, -8), //交互点的位置
      },
      // ../assets/images/map/objects/.jpg
      {
        key: "",
        value: "病例",
        description: "",
        cover: new URL("", import.meta.url).href,
        position: new Vector3(-12, -2, -28),
      },
    ],
  },
  {
    name: "手术室",
    key: "平面011",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(10, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "opertation",
        value: "手术台",
        description: "医生可在此进行手术",
        cover: new URL("/assets/images/operation.jpg", import.meta.url).href,
        position: new Vector3(5, -10, -20),
      },
    ],
  },
  {
    name: "病房",
    key: "平面001", //9、10、8
    map: new URL("/assets/诊所-VIP住院部_高分辨率.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(0, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "ward",
        value: "病房",
        description: "宠物在此处接受住院治疗",
        cover: new URL("/assets/images/.png", import.meta.url).href,
        position: new Vector3(5, -10, -20),
      },
    ],
  },
  {
    name: "CT",
    key: "平面003",
    map: new URL("/assets/宠物诊所-新手术台_高分辨率.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-10, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "",
        value: "CT扫描仪",
        description: "宠物在此处接受CT检查",
        cover: new URL("/assets/images/.png", import.meta.url).href,
        position: new Vector3(5, -10, -20),
      },
    ],
  },
  {
    name: "B超",
    key: "平面006",
    map: new URL("/assets/犬类接诊处_高分辨率.jpg", import.meta.url).href, 
    showSwitch: true,
    position: new Vector3(-20, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "",
        value: "B超",
        description: "宠物在此处扫描B超",
        cover: new URL("/assets/images/.png", import.meta.url).href,
        position: new Vector3(5, -10, -20),
      },
    ],
  },
  {
    name: "病案室",
    key: "平面002",
    map: new URL("/assets/犬类接诊处_高分辨率.jpg", import.meta.url).href, 
    showSwitch: true,
    position: new Vector3(-30, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "cases",
        value: "病例",
        description: "",
        cover: new URL("/assets/images/", import.meta.url).href,
        position: new Vector3(-5, -10, -20),
      }
    ],
  },
  {
    name: "药房",
    key: "平面007",
    map: new URL("/assets/犬类接诊处_高分辨率.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-40, 0, -50),
    label: new Vector3(),
    interactivePoints: [
      {
        key: "",
        value: "药品库",
        description: "可在此查看用药规范",
        cover: new URL("/assets/images/.png", import.meta.url).href,
        position: new Vector3(5, -10, -20),
      },
    ],
  },
];