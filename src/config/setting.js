export default {
  // site
  siteName: 'ConteWorld',
  siteUrl: 'https://isconte.com',
  beian: '粤ICP备17015159号-1',
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
  menuStatus: true, // 展示菜单

  storageKeys: {
    menuStatus: 'menu_status',
    routes: 'routes',
  },

  // header height
  headerHeight: 55,
  articleShowListWidth: 700,
}
