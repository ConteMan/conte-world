export default {
  path: '/about',
  meta: {
    title: '关于'
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
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
