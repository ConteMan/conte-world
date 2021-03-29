export default {
  path: '/worldline',
  name: 'WorldlineBase',
  meta: {
    title: '世界线'
  },
  redirect: { name: 'Worldline' },
  component: () => import('@/layout/BaseLayoutNoFoot'),
  children: [
    {
      path: 'index',
      name: 'Worldline',
      meta: {
        title: '世界线',
      },
      component: () => import('@/views/worldline/Worldline')
    },
  ]
};
