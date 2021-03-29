export default {
  path: '/changelog',
  name: 'ChangelogBase',
  meta: {
    title: '更新'
  },
  component: () => import('@/layout/BaseLayout'),
  redirect: { name: 'Changelog' },
  children: [
    {
      path: 'index',
      name: 'Changelog',
      meta: {
        title: '更新',
      },
      component: () => import('@/views/changelog')
    },
  ]
};
