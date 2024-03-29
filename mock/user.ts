//createUserList返回一个数组，包含两个用户信息
//具体使用说明：https://www.npmjs.com/package/mock
function createUserList() {
    return [
      {
        userId: 1,
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: 'admin',
        password: '123456',
        desc: '平台管理员',
        identity: 'admin',//管理员角色
        buttons: ['cuser.detail'],
        routes: ['home'],
        token: 'Admin Token',
      },
      {
        userId: 2,
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: 'expert',
        password: '123456',
        desc: '系统管理员',
        identity: 'expert',//专家角色
        buttons: ['cuser.detail', 'cuser.user'],
        routes: ['home'],
        token: 'Expert Token',
      },
      {
        userId: 3,
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: 'user',
        password: '123456',
        desc: '系统管理员',
        identity: 'user',//实习生角色
        buttons: ['cuser.detail', 'cuser.user'],
        routes: ['home'],
        token: 'User Token',
      },
    ]
  }
  
  //对外暴露数组：包含2个接口
  export default [
    // 用户登录接口
    // {
    //   url: '/api/user/login', //请求地址
    //   method: 'post', //请求方式
    //   response: ({ body }) => {
    //     //获取请求体携带过来的用户名与密码
    //     const { username, password } = body
    //     //调用获取用户信息函数,用于判断是否有此用户
    //     const checkUser = createUserList().find(
    //       (item) => item.username === username && item.password === password,
    //     )
    //     //没有用户返回失败信息
    //     if (!checkUser) {
    //       return { code: 201, data: { message: '账号或者密码不正确' } }
    //     }
    //     //如果有返回成功信息
    //     const { token } = checkUser
    //     return { code: 200, data: { token } }
    //   },
    // },
    // 获取用户信息
    {
      url: '/api/user/info',
      method: 'get',
      response: (request) => {
        //获取请求头携带token
        const token = request.headers.token
        //查看用户信息是否包含有次token用户
        const checkUser = createUserList().find((item) => item.token === token)
        //没有返回失败的信息
        if (!checkUser) {
          return { code: 201, data: { message: '获取用户信息失败' } }
        }
        //如果有返回成功信息
        return { code: 200, data: { checkUser } }
      },
    },
  ]