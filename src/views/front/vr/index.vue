<template>
  <div class="container">
    <canvas class="webgl"> </canvas>
    <!-- <button @click="goPanorama" style="z-index: 2000;">返回导览</button> -->
    <div class="vr">
      <!-- 切换房间 -->
      <div class="switch">
        <span
          class="button"
          v-for="(room, index) of rooms"
          :key="index"
          @click="switchRoom(room)"
          v-show="data.currentRoom !== room.name"
        >
          <b class="text">{{ room.name }}</b>
          <i class="icon"></i>
        </span>
      </div>
      <!-- 场景交互点 -->
      <!-- <div
        class="point"
        v-for="(point, index) in interactivePoints"
        :key="index"
        :class="[`point-${index}`, `point-${point.key}`]"
        @click="handleReactivePointClick(point)"
        v-show="point.room === data.currentRoom"
      >
        <div class="label" :class="[`label-${index}`,`label-${point.key}`]">
          <label class="label-tips">
            <div class="cover">
              <i
                class="icon"
                :style="{
                  background: `url(${point.cover}) no-repeat center`,
                  'background-size': 'contain',
                }"
              ></i>
            </div>
            <div class="info">
              <p class="p1">{{ point.value }}</p>
              <p class="p2">{{ point.description }}</p>
            </div>
          </label>
        </div>
      </div> -->
    </div>
    <pullUpMenu />
    <learnItem />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { rooms } from "@/views/panorama/data.js";
import * as THREE from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, reactive, computed, watch } from "vue";

import pullUpMenu from "@/components/pullUpMenu/index.vue";
import learnItem from "@/components/learnItem/index.vue";
import { Vector2 } from "three";

const $route = useRoute();
const $router = useRouter();
let paramKey = computed(()=>$route.query.key);
const room = computed(()=>rooms.filter((item) => item.key === paramKey.value)[0]);

//实现paramKey更新后页面刷新
watch(paramKey,(newValue,oldValue)=>{
  if(newValue!== oldValue){
    window.location.reload();
  }
})


const data = reactive({
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  cameraZAxis: 2,
  currentRoom: room.value.name,
});

data.currentRoom = room.value.name;

const goPanorama = () => {
  $router.push({ path: "/front/panorama" });
};

function switchRoom(target_room) {
  $router.push({
    path: "/front/vr",
    query: {
      key: target_room.key,
    },
  });
}

const handleReactivePointClick = (point) => {
  console.log(point, "clicked");
};

// 获取交互点的信息
const interactivePoints = computed(() => {
  const res = [];
  rooms.forEach((room) => {
    if (room.interactivePoints && room.interactivePoints.length > 0) {
      room.interactivePoints.forEach((point) => {
        point = {
          room: room.name,
          ...point,
        };
        res.push(point);
      });
    }
  });
  return res;
});

const initCamera = () => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1;
  // camera.position.z = -1;
  // data.scene.add(camera);
  data.camera = camera;
  return camera;
};

const initRenderer = () => {
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  return renderer;
};

const initControls = (camera, renderer) => {
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  //阻尼
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  controls.dampingFactor = 0.4;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;
  controls.update();
  data.controls = controls;
  return controls;
};

function loadEnv(scene) {
  const envMap = new THREE.TextureLoader().load(room.value.map);
  //球面全景图映射
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  //设置背景贴图
  scene.background = envMap;
  //设置环境贴图（提供环境光）
  scene.environment = envMap;
  return scene;
}
function createScene() {
  const scene = new THREE.Scene();
  data.scene = scene;
  return scene;
}

/* 创建sprite */
function makeTextSprite(message, position, parameters) {
  // console.log("3",message);
  // console.log("4",parameters);
  if (parameters === undefined) parameters = {};
  let fontface = parameters.hasOwnProperty.call("fontface")
    ? parameters["fontface"]
    : "Arial";
  /* 字体大小 */
  let fontsize = parameters.hasOwnProperty.call("fontsize")
    ? parameters["fontsize"]
    : 18;

  let color = parameters.hasOwnProperty.call("color")
    ? parameters["color"]
    : "rgba(70, 135, 61, 1.0)";
  /* 边框厚度 */
  let borderThickness = parameters.hasOwnProperty.call("borderThickness")
    ? parameters["borderThickness"]
    : 1;
  /* 边框颜色 */
  let borderColor = parameters.hasOwnProperty.call("borderColor")
    ? parameters["borderColor"]
    : {
        r: 183,
        g: 183,
        b: 183,
        a: 1.0,
      };
  /* 背景颜色 */
  //rgb(218, 249, 214)
  let backgroundColor = parameters.hasOwnProperty.call("backgroundColor")
    ? parameters["backgroundColor"]
    : {
        r: 218,
        g: 249,
        b: 214,
        a: 1.0,
      };
  /* 创建画布 */
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  /* 字体加粗 */
  context.font = "Bold " + fontsize + "px " + fontface;
  /* 获取文字的大小数据，高度取决于文字的大小 */
  let metrics = context.measureText(message);
  let textWidth = metrics.width;
  /* 背景颜色 */
  context.fillStyle =
    "rgba(" +
    backgroundColor.r +
    "," +
    backgroundColor.g +
    "," +
    backgroundColor.b +
    "," +
    backgroundColor.a +
    ")";
  /* 边框的颜色 */
  context.strokeStyle =
    "rgba(" +
    borderColor.r +
    "," +
    borderColor.g +
    "," +
    borderColor.b +
    "," +
    borderColor.a +
    ")";
  context.lineWidth = borderThickness;
  /* 绘制圆角矩形 */
  roundRect(
    context,
    borderThickness / 2,
    borderThickness / 2,
    textWidth + borderThickness,
    fontsize * 1.4 + borderThickness,
    6
  );
  /* 字体颜色 */
  context.fillStyle = color;
  context.fillText(message, borderThickness, fontsize + borderThickness);
  /* 画布内容用于纹理贴图 */
  // console.log(context);
  let texture = new THREE.Texture(canvas);
  // console.log("11",texture);
  texture.needsUpdate = true;
  let spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  let sprite = new THREE.Sprite(spriteMaterial);
  // console.log("111",sprite.position);
  // console.log(sprite.material);//有
  // console.log(position);
  sprite.position.set(position.x,position.y,position.z);
  // console.log("changed",sprite.position);
  /* 缩放比例 */
  sprite.scale.set(15, 8, 0)
  return sprite;
}

/* 绘制圆角矩形 */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function showPoints(room_name) {
    /* 根据room_name来获取到房间内的交互点 */
    //let points = [],sprite;
    // console.log("0",interactivePoints.value);
    interactivePoints.value.forEach((point) => {
    if (point.room === room_name) {
      // console.log("1",point.value);//exist
      data.scene.add(makeTextSprite(point.value,point.position));
      // sprite = makeTextSprite(point.value);
      // points.push(sprite);
      // sprite.position.set(point.position);
    }
  })
  
  // console.log(interactivePoints.value);//所有房间的interactivePoints信息
}
const initScene = () => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  let scene = createScene();
  let camera = initCamera();
  let renderer = initRenderer();
  let controls = initControls(camera, renderer);
  loadEnv(scene);
  // console.log(data.currentRoom);
  showPoints(data.currentRoom);
  //添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);
  //监听窗口缩放并自动适应
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // 更新渲染
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 更新相机
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });

  let mouse = new Vector2();
  window.addEventListener("mousemove", (e) => {
    mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    mouse.y = -2 * (e.clientY / window.innerHeight) + 1;
  });

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
  render();
};

onMounted(() => {
  initScene();
  // console.log(data.currentRoom);
});
</script>

<style lang="scss">
@import url("@/style/keyframes.scss");

.container {
  font-family: Helvetica, Arial, sans-serif;

  .webgl {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
  }

  .switch {
    position: fixed;
    left: 24px;
    top: 20%;
    z-index: 11;
    -webkit-animation: slideInRight 1s .3s;
    animation: slideInRight 1s .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;

    .button {
      display: block;
      background: rgba(27, 25, 24, .5);
      border-radius: 12px;
      display: flex;
      align-items: center;
      padding: 12px 8px 12px 24px;
      -webkit-backdrop-filter: blur(4px);
      -moz-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: all .25s ease-in-out;

      .text {
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        font-weight: 600;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .icon {
        display: inline-block;
        height: 30px;
        width: 30px;
        background: url("/assets/images/icon_arrow.png") no-repeat center;
        background-size: 100% 100%;
        transform: rotate(180deg);
        margin-left: 8px;
      }

      &:hover {
        background: rgba(27, 25, 24, .2);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
      }
    }
  }

  .point {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20;

    .label {
      position: absolute;
      top: -16px;
      left: -16px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 32px;
      font-weight: 100;
      font-size: 14px;
      cursor: help;
      transform: scale(0, 0);
      transition: all 0.3s ease-in-out;
      backdrop-filter: blur(4px);

      &::before, &::after {
        display: inline-block;
        content: '';
        background: rgba(255, 255, 255, 1);
        height: 100%;
        width: 100%;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -10px;
        margin-top: -10px;
      }

      &::before {
        animation: bounce-wave 1.5s infinite;
      }

      &::after {
        animation: bounce-wave 1.5s -0.4s infinite;
      }

      .label-tips {
        height: 88px;
        width: 200px;
        overflow: hidden;
        position: absolute;
        top: -32px;
        right: -220px;
        font-size: 32px;
        background: rgba(255, 255, 255, .6);
        border: 1px groove rgba(255, 255, 255, .5);
        -webkit-backdrop-filter: blur(4px);
        -moz-backdrop-filter: blur(4px);
        backdrop-filter: blur(4px);
        border-radius: 16px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .1);

        .cover {
          width: 80px;
          height: 100%;

          .icon {
            display: inline-block;
            height: 100%;
            width: 100%;
            filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, .1));
          }
        }

        .info {
          width: calc(100% - 80px);
          height: 100%;
          overflow: hidden;
          padding-left: 12px;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            text-shadow: 0 1px 1px rgba(0, 0, 0, .1);

            &.p1 {
              font-size: 24px;
              color: #1D1F24;
              font-weight: 800;
              margin: 12px 0 2px;
            }

            &.p2 {
              font-size: 18px;
              color: #00aa47;
              font-weight: 500;
            }
          }
        }
      }
    }

    .text {
      position: absolute;
      top: 30px;
      left: -120px;
      width: 200px;
      padding: 20px;
      border-radius: 4px;
      background: rgba(0, 0, 0, .6);
      border: 1px solid #ffffff;
      color: #ffffff;
      line-height: 1.3em;
      font-weight: 100;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      text-align: justify;
      text-align-last: left;

      &:hover {
        opacity: 1;
      }
    }

    &.visible .label {
      transform: scale(1, 1);
    }
  }
}

@keyframes bounce-wave {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3.6);
    opacity: 0;
  }
}

.animate-point-wave::before {
  content: '';
  animation: bounce-wave 1.5s infinite;
}

.animate-point-wave::after {
  content: '';
  animation: bounce-wave 1.5s -0.4s infinite;
}

</style>
