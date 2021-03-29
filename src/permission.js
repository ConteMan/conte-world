import router from '@/router';
import setting from '@/config/setting';

router.beforeEach(async(to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + setting.siteName;
  }
  // 生产环境，百度统计
  if (to.path && process.env.NODE_ENV === 'production') {
    window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  next();
});
