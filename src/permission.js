import router, { routes as constRotes, resetRouter } from "@/router"
import config from "@/config"
import store from "./store"
import { getToken,removeToken } from "@/untils/auth"
import login from "@/router/modules/login"
import logout from "@/router/modules/logout"

router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title+ ' ' +config.siteName

    let toName = to.name

    if(toName == 'Logout' || to.path == '/logout'){
        await store.commit("user/SET_TOKEN", '')
        resetRouter()
        await removeToken()
        let finalRoutes = []
        constRotes.forEach((item, index) => {
            if(item.name == 'Logout') {
                return
            }
            finalRoutes.push(item)
        })
        await store.commit('SET_ROUTES', finalRoutes)
        next({name: 'One'})
        return
    }

    //登录状态判断
    let cookieLogin = false
    const hasToken = getToken()
    if (hasToken) {
        if (to.name == 'Login') {
            next({name: 'IndexBase'})
        } else {
            const hasVToken = store.getters["user/token"]
            if (!hasVToken) {
                await store.commit("user/SET_TOKEN", hasToken)
                const addRoutes = await store.dispatch("generateRoutes")
                router.addRoutes(addRoutes)
                cookieLogin = true
            }
        }
    }

    //路由菜单处理，激活状态
    const routes = store.getters['routes']

    let finalRoutes = []
    let isMatchRoute = false
    routes.forEach((item, index) => {
        item.active = false
        if(item.name == toName) {
            item.active = true
            return
        } else {
            if(item.children) {
                item.children.forEach((cItem, cIndex)=> {
                    if (cItem.name == toName) {
                        item.active = true
                    }
                })
            } else {
                item.active = false
            }
        }
        if (typeof item.active === "undefined") item.active = false
        if (!isMatchRoute && item.active) isMatchRoute = true

        if(item.name == 'LoginBase' || item.name == 'Logout') {
            return
        }
        finalRoutes.push(item)
    })
    if (hasToken) {
        finalRoutes.push(logout)
    } else {
        finalRoutes.push(login)
    }
    await store.commit('SET_ROUTES', finalRoutes)

    if (cookieLogin) {
        //确保路由添加完毕
        next({ ...to, replace: true })
    } else {
        next()
    }
})