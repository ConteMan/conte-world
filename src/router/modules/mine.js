export default {
  path: '/mine',
  name: 'MineBase',
  meta: {
    title: '我的'
  },
  redirect: { name: 'Mine' },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: 'index',
      name: 'Mine',
      meta: {
        title: '信息',
      },
      component: () => import('@/views/mine')
    },
    {
      path: 'setting',
      name: 'MineSetting',
      meta: {
        title: '设置',
      },
      component: () => import('@/views/mine/setting')
    },
    {
      path: 'one',
      name: 'MineOne',
      meta: {
        title: '一个',
      },
      component: () => import('@/views/mine/one')
    }
  ]
};
