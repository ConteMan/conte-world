export default {
  path: '/about',
  name: 'AboutBase',
  meta: {
    title: '关于'
  },
  component: () => import('@/layout/BaseLayout'),
  redirect: { name: 'About' },
  children: [
    {
      path: 'index',
      name: 'About',
      meta: {
        title: '关于',
      },
      component: () => import('@/views/about')
    },
  ]
}
