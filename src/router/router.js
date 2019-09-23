import Vue from 'vue'
import Router from 'vue-router'
import Yuncun from '@/views/yuncun/index'
import Login from '@/views/antd-admin/login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', //主页
      name: 'home',
      meta: {
        title: '云村乐评1'
      },
      component: Yuncun
    },
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'antd-admin',
    },
    {
      path: '/components', //组件
      name: 'components',
      component: () => import('@/views/components/index'), //懒加载
      redirect:'/components/yuncun', //重定向
      children: [
        {
          path: 'yuncun',
          name: 'yuncun',
          meta: {
            title: '云村乐评'
          },
          component: () => import('@/views/components/Yuncun.vue') //懒加载
        }
      ]
    },
    { path: '*',
      redirect:'/'
    }
  ]
})