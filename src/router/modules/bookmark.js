export default {
  path: '/bookmark',
  meta: {
    title: 'Bookmark',
  },
  component: () => import('@/layout/BlankLayout.vue'),
  children: [
    {
      path: '',
      name: 'Bookmark',
      meta: {
        title: 'Bookmark',
      },
      props: (route) => ({
        type: route.query.type || '',
        slug: route.query.slug || '',
      }),
      component: () => import('@/views/bookmark'),
    },
  ],
};
