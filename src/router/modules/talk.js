export default {
  path: '/talk',
  meta: {
    title: '说说'
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
  children: [
    {
      path: '',
      name: 'Talk',
      meta: {
        title: '说说',
      },
      component: () => import('@/views/talk')
    },
  ]
};
