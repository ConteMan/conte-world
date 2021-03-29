export default {
  path: '/',
  name: 'MainBase',
  hidden: true,
  meta: {
    title: '泊物誌'
  },
  component: () => import('@/layout/BaseLayout'),
  redirect: { name: 'One' },
  children: [
    {
      path: 'index',
      name: 'Main',
      meta: {
        title: '泊物誌',
      },
      component: () => import('@/views/main'),
      redirect: { name: 'One' },
    },
  ]
};
