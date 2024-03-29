//createUserList返回一个数组，包含两个用户信息
//具体使用说明：https://www.npmjs.com/package/mock
function createUserList() {
    return [
      {
        user_id: 1,
        username: 'admin',
        password: '123456',
        identity: 'admin',//管理员角色
        phone_number:'123456789',
        email:'123457@qq.com',
        timestamp:'2024-3-29',
        Token: 'Admin Token 2024-3-29',
      },
      {
        user_id: 2,
        username: 'expert',
        password: '123456',
        identity: 'expert',//专家角色
        phone_number:'987654321',
        email:'7654321@qq.com',
        timestamp:'2024-3-29',
        Token: 'Expert Token 2024-3-29',
      },
      {
        user_id: 3,
        username: 'user',
        password: '123456',
        identity: 'user',//实习生角色
        phone_number:'37579951',
        email:'132835@qq.com',
        timestamp:'2024-3-29',
        Token: 'User Token 2024-3-29',
      },
    ]
  }
  
  //对外暴露数组：包含2个接口
  export default [
    // 用户登录接口
    {
      url: '/api/user/login', //请求地址
      method: 'post', //请求方式
      response: ({ body }) => {
        //获取请求体携带过来的用户名与密码
        const { username, password } = body
        //调用获取用户信息函数,用于判断是否有此用户
        const checkUser = createUserList().find(
          (item) => item.username === username && item.password === password,
        )
        //没有用户返回失败信息
        if (!checkUser) {
          return { code: 201, message: '账号或者密码不正确',data: {  } }
        }
        //如果有返回成功信息
        const { Token } = checkUser
        return { code: 200, message:'',data: { Token } }
      },
    },
    // 获取用户信息
    {
      url: '/api/user/info',
      method: 'get',
      response: (request) => {
        //获取请求头携带token
        const token = request.headers.token
        //查看用户信息是否包含有次token用户
        const checkUser = createUserList().find((item) => item.Token == token)
        //没有返回失败的信息
        if (!checkUser) {
          return { code: 201,message: '获取用户信息失败', data: { } }
        }
        //如果有返回成功信息
        return { code: 200, message:'success', data:  checkUser  }
      },
    },
  ]