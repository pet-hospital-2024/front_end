//常量路由：全部用户都可以访问(暂时)
export const constantRoute = [
  {
    path: "/front",
    component: () => import("@/layout/front/index.vue"),
    redirect:'/front/home',
    children: [
      {
        path: '/front/home',
        name: "front_home",
        component: () => import('@/views/front/home/index.vue'),
      },
      {
        path: "/front/study",
        name: "study",
        component: () => import("@/views/front/study/index.vue"),
      },
      {
        path: "/front/role",
        name: "role",
        component: () => import("@/views/front/role/index.vue"),
      },
      {
        path: "/front/case",
        name: "case",
        component: () => import("@/views/front/case/index.vue"),
      },
      {
        path: "/front/caseList",
        name: "caseList",
        component: () => import("@/views/front/caseList/index.vue"),
      },
      {
        path: "/front/caseDetail",
        name: "caseDetail",
        component: () => import("@/views/front/caseDetail/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    // meta: {
    //   title: "登录", //菜单标题
    //   hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
    //   icon: "Promotion", //菜单文字左侧的图标,支持element-plus全部图标
    // },
  },
  {
    path: "/",
    // component:()=>import('@/layout/front/index.vue'),
    // name:'layout_front',
    redirect: "/front",
    
  },
];
