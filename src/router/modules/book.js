export default {
  path: '/book',
  meta: {
    title: '读书'
  },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: '',
      name: 'Book',
      meta: {
        title: '读书',
      },
      component: () => import('@/views/book/new')
    },
  ]
};
