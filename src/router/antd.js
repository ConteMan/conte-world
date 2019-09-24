import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/antd/login/Login'
import MenuView from "@/layouts/antd/MenuView";
import RouteView from "@/layouts/antd/RouteView";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: 'index',
      component: MenuView,
      invisible: true,
      redirect: '/dashboard/workplace',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          component: RouteView,
          redirect: '/dashboard/workplace',
          children: [
            {
              path: '/dashboard/workplace',
              name: '工作台',
              icon: 'none',
              meta: {
                title: "工作台"
              },
              component: () => import('@/views/antd/dashboard/WorkPlace')
            },
            {
              path: '/dashboard/analysis',
              name: '分析页',
              icon: 'none',
              meta: {
                title: "分析页"
              },
              component: () => import('@/views/antd/dashboard/Analysis')
            }
          ]
        }
      ]
    }
  ]
})