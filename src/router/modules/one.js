export default {
  path: '/one',
  name: 'OneBase',
  meta: {
    title: '一个'
  },
  redirect: { name: 'One' },
  component: () => import('@/layout/BaseLayout'),
  children: [
    {
      path: '',
      name: 'One',
      meta: {
        title: '一个',
      },
      component: () => import('@/views/one/index')
    },
  ]
};
