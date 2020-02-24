import router, { routes } from "@/router"
import config from "@/config"
import store from "./store"

router.beforeEach(async(to, from, next) => {
    document.title = config.siteName + ' - ' + to.meta.title
    let toName = to.name
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
    })
    console.log(routes)
    store.commit('setRoutes', routes)
    next()
})