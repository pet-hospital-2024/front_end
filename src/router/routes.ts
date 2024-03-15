//常量路由：全部用户都可以访问(暂时)
export const constantRoute = [
  {
    path: "/front",
    component: () => import("@/layout/front/index.vue"),
    redirect:'/front/home',
    meta:{
      hidden:true,
      title:"",
    },
    children: [
      {
        path: '/front/home',
        name: "front_home",
        component: () => import('@/views/front/home/index.vue'),
        meta:{
          hidden:true,
          title:"",
        },
      },
      {
        path: "/front/study",
        name: "study",
        component: () => import("@/views/front/study/index.vue"),
        meta:{
          hidden:true,
          title:"",
        },
      },
      {
        path: "/front/role",
        name: "role",
        component: () => import("@/views/front/role/index.vue"),
        meta:{
          hidden:true,
          title:"",
        },
      },
      {
        path: "/front/case",
        name: "case",
        component: () => import("@/views/front/case/index.vue"),
        meta:{
          hidden:true,
          title:"",
        },
      },
      {
        path: "/front/caseList",
        name: "caseList",
        component: () => import("@/views/front/caseList/index.vue"),
        meta:{
          hidden:true,
          title:"",
        },
      },
      {
        path: "/front/caseDetail",
        name: "caseDetail",
        component: () => import("@/views/front/caseDetail/index.vue"),
        meta:{
          hidden:true,
          title:"",
        },  
      },
    ],
  },

  /*{
    path: "/",
    // component:()=>import('@/layout/front/index.vue'),
    // name:'layout_front',
    redirect: "/front",
    
  },*/

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'login',
      hidden: true,//隐藏与后台无关页面
    },
  },
  //后台layout和home page
  {
    path: '/back',
    component: () => import('@/layout/back/index.vue'),
    name: 'backLayout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    //redirect: '/home',
    children: [
      {
        path: '/back/home',
        component: () => import('@/views/back/home/index.vue'),
        name:"backHome",
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        }
      },
    ]
  },
  //管理员相关界面路由
  {
    path: '/back/acl',
    component: () => import( '@/layout/back/index.vue' ),
    name:"backAcl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon:"Avatar",
    },
    children:[
      {
        path:"/back/acl/user",
        component:()=>import('@/views/back/acl/user/index.vue'),
        name:"backUser",
        meta:{
          title:"用户管理",
          hidden:false, 
        }
      },
      {
        path:"/back/acl/role",
        component:()=>import('@/views/back/acl/role/index.vue'),
        name:"backRole",
        meta:{
          title:"角色管理",
          hidden:false, 
        }
      },
    ]
  },
  //病例管理相关界面跳转路由
  {
    path:"/back/case",
    component:()=>import('@/views/back/case/index.vue'),
    name:"backCase",
    meta:{
      title:"病例管理",
      hidden:false,
      icon:"Files",
    },
  },
  //考试管理系统相关界面跳转路由
  {
    path:"/back/exam",
    component:()=>import('@/layout/back/index.vue'),
    name:"backExam",
    meta:{
      title:'学习管理',
      hidden:false,
      icon:"Reading",
    },
    children:[
      {
        path:'/back/exam/questions',
        component:()=>import('@/views/back/exam/questions/index.vue'),
        name:'backQuestions',
        meta:{
          title:'考题管理',
          hidden:false,
        }
      },
      {
        path:'/back/exam/test',
        component:()=>import('@/views/back/exam/test/index.vue'),
        name:'backTest',
        meta:{
          title:'考试管理',
          hidden:false,
        }
      },
      {
        path:'/back/exam/paper',
        component:()=>import('@/views/back/exam/paper/index.vue'),
        name:'backPaper',
        meta:{
          title:'试卷管理',
          hidden:false,
        }
      },
    ]
  }
]
