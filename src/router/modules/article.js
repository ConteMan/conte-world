export default {
  path: '/article',
  meta: {
    title: '文章'
  },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: '',
      name: 'Article',
      meta: {
        title: '文章',
      },
      component: () => import('@/views/article')
    },
    {
      path: ':id',
      name: 'ArticleDetail',
      meta: {
        title: '文章',
      },
      component: () => import('@/views/article/detail')
    },
  ]
}
