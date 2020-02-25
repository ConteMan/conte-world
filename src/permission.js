import router, { routes } from "@/router"
import config from "@/config"
import store from "./store"

router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title+ ' ' +config.siteName

    let blackList = ['IndexBase', '404', 'AboutBase', 'LoginBase']
    let toName = to.name
    let finalRoutes = []
    routes.forEach((item, index) => {
        if(blackList.indexOf(item.name) < 0) {
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
            finalRoutes.push(item)
        }
    })
    store.commit('setRoutes', finalRoutes)

    next()
})