import Vue from 'vue'
import Router from 'vue-router'

import film from '@/router/modules/film'
import one from '@/router/modules/one'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                title: "Conte can't stop"
            },
            component:  () => import("@/layout/BaseLayout"),
            children: [
                {
                    path: '/index',
                    name: 'Index',
                    meta: {
                        title: '首页',
                    },
                    component: () => import('@/views/main/index')
                },
                {
                    path: '/about',
                    name: 'About',
                    meta: {
                        title: '关于',
                    },
                    component: () => import('@/views/main/about')
                },
            ]
        },
        film,
        one,
    ]
})