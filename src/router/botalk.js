import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/botalk/main/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '主页',
            meta: {
                title: 'Bo Words'
            },
            component: Main
        }
    ]
})