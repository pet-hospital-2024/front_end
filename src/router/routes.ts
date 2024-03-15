export const constantRoute = [
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
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'backLayout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
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
    path: '/acl',
    component: () => import( '@/layout/index.vue' ),
    name:"backAcl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon:"Avatar",
    },
    children:[
      {
        path:"/acl/user",
        component:()=>import('@/views/back/acl/user/index.vue'),
        name:"backUser",
        meta:{
          title:"用户管理",
          hidden:false, 
        }
      },
      {
        path:"/acl/role",
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
    path:"/case",
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
    path:"/exam",
    component:()=>import('@/layout/index.vue'),
    name:"backExam",
    meta:{
      title:'学习管理',
      hidden:false,
      icon:"Reading",
    },
    children:[
      {
        path:'/exam/questions',
        component:()=>import('@/views/back/exam/questions/index.vue'),
        name:'backQuestions',
        meta:{
          title:'考题管理',
          hidden:false,
        }
      },
      {
        path:'/exam/test',
        component:()=>import('@/views/back/exam/test/index.vue'),
        name:'backTest',
        meta:{
          title:'考试管理',
          hidden:false,
        }
      },
      {
        path:'/exam/paper',
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