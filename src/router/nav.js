import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/nav/main/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '主页',
            meta: {
                title: 'Bo Nav'
            },
            component: Index
        }
    ]
})