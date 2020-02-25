import store from "@/store"
import router, { routes,authRoutes,noneRoute } from "@/router"
import Message from 'ant-design-vue/lib/message'

//登录处理
export function loginDeal(data) {
    try {
        //加入登录后可见路由

        store.commit('user/setToken', data.token)
        router.push({name: 'Mine'})
    } catch (e) {
        console.log(e)
    }
}