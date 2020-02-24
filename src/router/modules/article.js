export default {
    path: '/article',
    name: 'ArticleBase',
    meta: {
        title: "文章"
    },
    redirect: { name: 'Article' },
    component:  () => import("@/layout/BaseLayout"),
    children: [
        {
            path: 'index',
            name: 'Article',
            meta: {
                title: '文章',
            },
            component: () => import('@/views/article')
        },
        {
            path: 'detail/:id',
            name: 'ArticleDetail',
            meta: {
                title: '文章',
            },
            component: () => import('@/views/article/detail')
        },
    ]
}