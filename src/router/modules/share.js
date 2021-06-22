export default {
  path: '/share',
  meta: {
    title: 'Share',
  },
  component: () => import('@/layout/BlankLayout.vue'),
  children: [
    {
      path: '',
      name: 'Share',
      meta: {
        title: 'Share',
      },
      props: (route) => ({
        type: route.query.type || '',
        slug: route.query.slug || '',
      }),
      component: () => import('@/views/share'),
    },
  ],
};
