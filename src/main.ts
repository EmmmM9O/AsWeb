import { createApp } from 'vue'
import App from './App.vue'
import main from './vue/Pages/MainPage.vue'
import map from './vue/Pages/MapPage.vue'
import stores from './vue/stores'
import {createRouter,createWebHashHistory} from 'vue-router'
const routes=[
    { path: '/', name:"主页",component: main ,meta:{show:true}},
    { path: '/map',name:"地图", component: map ,meta:{show:true}}
]
const router = createRouter({
      // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
        routes, // `routes: routes` 的缩写
    })
const app = createApp(App);
app.use(router).use(stores);
app.mount("#app");
app.config.errorHandler = (err, vm,info) => {
    console.log('errorHandle', err, vm, info);
    // err，错误对象
    // vm，发生错误的组件实例
    // info，Vue特定的错误信息，例如错误发生的生命周期、错误发生的事件
}