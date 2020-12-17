export default {
  path: '/film',
  name: 'FilmBase',
  meta: {
    title: '电影'
  },
  redirect: { name: 'Film' },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: 'index',
      name: 'Film',
      meta: {
        title: '电影',
      },
      component: () => import('@/views/film/index')
    },
  ]
}
