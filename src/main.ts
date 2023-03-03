// main.ts
// 完整引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router)
// .use(ElementPlus)
.mount('#app')
