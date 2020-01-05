import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                title: "Conte can't stop"
            },
            component:  () => import("../views/main/index")
        },
    ]
})