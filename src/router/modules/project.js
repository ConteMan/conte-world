export default {
  path: '/project',
  meta: {
    title: '项目',
  },
  component: () => import('@/layout/v2/BaseLayout.vue'),
  children: [
    {
      path: ':id?',
      name: 'Project',
      meta: {
        title: '项目',
      },
      component: () => import('@/views/project'),
    },
  ],
};
