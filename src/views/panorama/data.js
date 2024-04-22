import { Vector3 } from 'three';

export const rooms = [
  {
    name: "前台",
    key: "平面012",
    map: new URL("/assets/reception.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "接待处",
        position: new Vector3(20, -5, 20),
      }
    ],
  },
  {
    name: "诊室",
    key: "平面004", //005
    map: new URL("/assets/consulting-room.jpg", import.meta.url).href,
    //每个房间的交互点
    interactivePoints: [
      {
        value: "诊断", //交互点名称
        position: new Vector3(-8, -4, -14), //交互点的位置
      },
    ],
  },
  {
    name: "手术室",
    key: "平面011",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "手术台",
        position: new Vector3(6, -12, -18),
      },
    ],
  },
  {
    name: "病房",
    key: "平面001", //9、10、8
    map: new URL("/assets/诊所-VIP住院部_高分辨率.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "病房",
        position: new Vector3(-8, -10, -20),
      },
    ],
  },
  {
    name: "CT",
    key: "平面003",
    map: new URL("/assets/宠物诊所-新手术台_高分辨率.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "CT扫描仪",
        position: new Vector3(-5, 0, 20),
      },
    ],
  },
  {
    name: "B超",
    key: "平面006",
    map: new URL("/assets/宠物诊所-新手术台_高分辨率.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "B超仪",
        position: new Vector3(-18, -10, 11),
      },
    ],
  },
  {
    name: "病案室",
    key: "平面002",
    map: new URL("/assets/犬类接诊处_高分辨率.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "病历记录",
        position: new Vector3(-12, -10, -11),
      }
    ],
  },
  {
    name: "药房",
    key: "平面007",
    map: new URL("/assets/犬类接诊处_高分辨率.jpg", import.meta.url).href,
    interactivePoints: [
      {
        value: "药品库",
        position: new Vector3(5, -7, -20),
      },
    ],
  },
];