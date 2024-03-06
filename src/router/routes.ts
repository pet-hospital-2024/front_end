//常量路由：全部用户都可以访问
export const constantRoute=[
    {
      path: "/home",
      component: () => import("@/views/home/index.vue"),
    },
    {
      path:"/study",
      component:()=>import("@/views/study/index.vue"),
    },
    {
      path:"/role",
      component:()=>import("@/views/role/index.vue"),
    },
    {
      path:"/case",
      component:()=>import("@/views/case/index.vue"),
    },
    {
      path:"/test",
      component:()=>import("@/views/test/index.vue"),
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