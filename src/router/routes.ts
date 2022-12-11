/** 根路由 */
export const ROOT_ROUTE = {
  name: 'root',
  path: '/',
  component: () => import('~/views/Main.vue'),
  meta: {
    title: 'Conte World',
  },
}

/** 固定的路由 */
export const constantRoutes = [
  ROOT_ROUTE,
  {
    name: 'article',
    path: '/article',
    component: () => import('~/views/article/Article.vue'),
    meta: {
      title: '文章',
    },
  },
  {
    name: 'article-view',
    path: '/article/:id',
    component: () => import('~/views/article/ArticleView.vue'),
    meta: {
      title: '文章详情',
    },
  },
  // 匹配无效路径的路由
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
