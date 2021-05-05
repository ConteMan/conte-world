export default {
  path: '/article',
  meta: {
    title: '文章'
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
  children: [
    {
      path: ':id?',
      name: 'Article',
      meta: {
        title: '文章',
      },
      component: () => import('@/views/article')
    },
  ]
};
