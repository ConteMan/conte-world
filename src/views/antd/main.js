import Vue from 'vue'
import App from '@/views/antd/App.vue'

import '@/mock'
import router from '@/router/antd'
import store from '@/store/antd'

import axios from 'axios'
import 'ant-design-vue/dist/antd.css'

import Antd from 'ant-design-vue'
import '@/assets/js/common.js'

import api from '@/api'
import Viser from 'viser-vue'
import PouchDB from 'pouchdb'

Vue.use(Antd)
Vue.use(Viser)

Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    mounted(){
        var db = new PouchDB('admindb')
        db.get('currUser').then(doc => {
            this.$store.commit('account/setuser', doc.user)
        })
    }
}).$mount('#app')


//路由发生变化修改页面
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    document.title = to.meta.title || 'title is missing'
    next()
})
router.afterEach(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})
