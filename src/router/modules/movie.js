export default {
  path: '/movie',
  meta: {
    title: '影视'
  },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: '',
      name: 'Movie',
      meta: {
        title: '影视',
      },
      component: () => import('@/views/movie/new')
    },
  ]
};
