export default {
  path: '/movie',
  name: 'MovieBase',
  meta: {
    title: '影视'
  },
  redirect: { name: 'Movie' },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: 'index',
      name: 'Movie',
      meta: {
        title: '影视',
      },
      component: () => import('@/views/movie/index')
    },
  ]
}
