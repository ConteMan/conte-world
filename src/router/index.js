import Vue from 'vue'
import Router from 'vue-router'

import film from '@/router/modules/film'
import one from '@/router/modules/one'
import article from "@/router/modules/article"
import about from "@/router/modules/about"
import changelog from "@/router/modules/changelog"
import login from "@/router/modules/login"

Vue.use(Router)

//通用路由
export const routes = [
    {
        path: '/',
        name: 'IndexBase',
        meta: {
            title: "首页"
        },
        redirect: { name: 'One' },
        component:  () => import("@/layout/BaseLayout"),
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: '首页',
                },
                component: () => import('@/views/main')
            }
        ]
    },
    one,
    article,
    film,
    changelog,
    about,
    login,
]

//未定义路由
export const noneRoute = [
    {
        path: '*',
        name: '404',
        meta: {
            title: "404"
        },
        redirect: { name: 'One' },
    }
]

//登录可见路由
export const authRoutes = [
    {
        path: '/mine',
        name: 'MineBase',
        meta: {
            title: "我"
        },
        redirect: { name: 'User' },
        component:  () => import("@/layout/BaseLayout"),
        children: [
            {
                path: '/index',
                name: 'Mine',
                meta: {
                    title: '我',
                },
                component: () => import('@/views/mine')
            }
        ]
    },
]

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

export default new Router({
    routes: [...routes, ...authRoutes]
})