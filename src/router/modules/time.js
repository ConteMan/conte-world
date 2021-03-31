export default {
  path: '/time',
  meta: {
    title: 'Time'
  },
  component: () => import('@/layout/BlankLayout.vue'),
  children: [
    {
      path: '',
      name: 'Time',
      meta: {
        title: 'Time',
      },
      component: () => import('@/views/time')
    },
  ]
};
