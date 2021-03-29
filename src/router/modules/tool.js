export default {
  path: '/tool',
  name: 'ToolBase',
  meta: {
    title: '工具'
  },
  component: () => import('@/layout/BaseLayout'),
  redirect: { name: 'ToolJsoneditor' },
  children: [
    {
      path: 'jsoneditor',
      name: 'ToolJsoneditor',
      meta: {
        title: 'JSON',
      },
      component: () => import('@/views/tool/json')
    },
  ]
};
