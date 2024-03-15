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
      {
        path: "/front/test",
        name: "test",
        component: () => import("@/views/front/test/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    path: "/",
    redirect: "/front/test",
  },
];
