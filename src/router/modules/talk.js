export default {
  path: '/talk',
  meta: {
    title: '说说'
  },
  component: () => import('@/layout/BaseLayout'),
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
