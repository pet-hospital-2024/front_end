import { createI18n } from 'vue-i18n'
export default createI18n({
    legacy: false, // 让 setup 函数可以通过 t 访问
    globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
    locale: 'zh-cn' ,
    fallbackLocale: 'zh-cn',  //切换 zh-cn en-us 控制展示文字
    messages: {
        'zh-cn': {
            index: {
                title: '你好，vue-i18n'
            }
        },
        'en-us': {
            index: {
                title: 'Hello, Vue-i18n'
            }
        }
    }
})