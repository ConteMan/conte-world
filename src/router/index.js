import Vue from 'vue'
import Router from 'vue-router'

import film from '@/router/modules/film'
import one from '@/router/modules/one'
import article from "@/router/modules/article"
import about from "@/router/modules/about"

Vue.use(Router)

export const routes = [
    // {
    //     path: '/',
    //     name: 'IndexBase',
    //     meta: {
    //         title: "首页"
    //     },
    //     redirect: { name: 'One' },
    //     component:  () => import("@/layout/BaseLayout"),
    //     children: [
    //         {
    //             path: '/index',
    //             name: 'Index',
    //             meta: {
    //                 title: '首页',
    //             },
    //             component: () => import('@/views/main')
    //         }
    //     ]
    // },
    one,
    article,
    film,
    //about,
]

export default new Router({
    routes: routes
})