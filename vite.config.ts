import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入node提供内置模块path:可以获取绝对路径
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'


export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return{
    plugins: [
      vue(),
       viteMockServe({
        localEnabled: command === 'serve',//保证开发阶段可以使用mock接口
      })
    ],
    
    resolve: {
      alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url))
        "@": path.resolve(__dirname, 'src')
      }
    },
  //scss 全局变量配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/style/variable.scss";',
      },
    },
  },
      // 代理跨域
     /* server: {
        proxy: {
          '/api': { // 匹配以 /api 开头的请求
            target: 'http://localhost:8081', // 本地后端服务器地址
            changeOrigin: true, // 支持跨域请求
            rewrite: (path) => path.replace(/^\/api/, ''), // 去除路径中的 /api 前缀
          },
        },
      },*/
      
  }
  
}

