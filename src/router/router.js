import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', //主页
      name: 'home',
      meta: {
        title: '云村乐评'
      },
      component: Home
    },
    {
      path: '/c', //组件
      name: 'components',
      component: () => import('../views/c/index'), //懒加载
      redirect:'/c/yuncun', //重定向
      children: [
        {
          path: 'yuncun',
          name: 'yuncun',
          meta: {
            title: '云村乐评'
          },
          component: () => import('../views/c/Yuncun.vue') //懒加载
        }
      ]
    },
    { path: '*',
      redirect:'/'
    }
  ]
})