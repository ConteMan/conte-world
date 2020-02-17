export default {
    path: '/film',
    name: 'Film',
    meta: {
        title: "Movie long life"
    },
    component:  () => import("@/layout/BaseLayout"),
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