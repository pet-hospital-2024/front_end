//常量路由：全部用户都可以访问(暂时)
export const constantRoute=[
    {
      path: "/front_home",
      component: () => import("@/views/front/home/index.vue"),
    },
    {
      path:"/study",
      component:()=>import("@/views/front/study/index.vue"),
    },
    {
      path:"/role",
      component:()=>import("@/views/front/role/index.vue"),
    },
    {
      path:"/case",
      component:()=>import("@/views/front/case/index.vue"),
    },
    {
      path:"/test",
      component:()=>import("@/views/front/test/index.vue"),
    },
    {
      path:"/login",
      component:()=>import("@/views/login/index.vue"),
    },
    {
      path: "/",
      redirect: "/login",
    },
]