import Vue from 'vue'
import Router from 'vue-router'
import Yuncun from '@/views/default/yuncun/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '云村乐评1'
      },
      component: Yuncun
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('@/views/default/components/index'),
      redirect:'/components/yuncun',
      children: [
        {
          path: 'yuncun',
          name: 'yuncun',
          meta: {
            title: '云村乐评'
          },
          component: () => import('@/views/default/components/Yuncun.vue')
        }
      ]
    }
  ]
})