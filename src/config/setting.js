export default {
  // site
  siteName: 'ConteWorld',
  siteUrl: 'https://isconte.com',
  beian: '粤ICP备17015159号',
  policeBeian: '粤公网安备44030702002732号',
  policeBeianNum: '44030702002732',
  siteCreateTime: '2019',
  GA: 'UA-108159539-1',

  // setting
  storageOptions: {
    namespace: 'isconte__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },

  // local setting
  layoutMode: 'static', // static 定宽， fit 适应
  staticWidth: 1024, // 定宽模式宽度
  menuStatus: true, // 展示菜单

  storageKeys: {
    menuStatus: 'menu_status',
    routes: 'routes',
    layoutMode: 'layout_mode',
  },

  // header height
  headerHeight: 48,
  headerHideHeight: 0,
  articleShowListWidth: 700,
};
