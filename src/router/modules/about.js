export default {
  path: '/about',
  meta: {
    title: '关于'
  },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: '',
      name: 'About',
      meta: {
        title: '关于',
      },
      component: () => import('@/views/about')
    },
  ]
};
