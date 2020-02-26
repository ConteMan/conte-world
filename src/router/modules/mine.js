export default {
    path: '/mine',
    name: 'MineBase',
    meta: {
        title: "我"
    },
    redirect: { name: 'Mine' },
    component:  () => import("@/layout/BaseLayout"),
    children: [
        {
            path: '/index',
            name: 'Mine',
            meta: {
                title: '我',
            },
            component: () => import('@/views/mine')
        }
    ]
}