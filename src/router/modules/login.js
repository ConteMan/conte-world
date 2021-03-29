export default {
  path: '/login',
  name: 'LoginBase',
  hidden: true,
  meta: {
    title: '登录'
  },
  component: () => import('@/layout/BaseLayout'),
  redirect: { name: 'Login' },
  children: [
    {
      path: 'index',
      name: 'Login',
      meta: {
        title: '登录',
      },
      component: () => import('@/views/login')
    },
  ]
};
