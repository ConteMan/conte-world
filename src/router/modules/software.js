export default {
  path: '/software',
  meta: {
    title: '软件',
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
  children: [
    {
      path: ':id?',
      name: 'Software',
      meta: {
        title: '软件',
      },
      component: () => import('@/views/software'),
    },
  ],
};
