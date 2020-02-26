import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

import film from '@/router/modules/film'
import one from '@/router/modules/one'
import article from "@/router/modules/article"
import about from "@/router/modules/about"
import changelog from "@/router/modules/changelog"
import login from "@/router/modules/login"
import mine from "@/router/modules/mine"
import logout from "@/router/modules/logout"

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
    mine,
    logout,
]

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

const createRouter = function () {
    return new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: routes
    })

}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router