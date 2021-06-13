export default {
  path: '/date',
  meta: {
    title: '日子',
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
  children: [
    {
      path: ':id?',
      name: 'Date',
      meta: {
        title: '日子',
      },
      component: () => import('@/views/date'),
    },
  ],
};
