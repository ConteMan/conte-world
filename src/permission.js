import router from '@/router';
import setting from '@/config/setting';
import store from '@/store';
import * as MT from '@/store/mutation-types';

router.beforeEach(async (to, from, next) => {
  document.title = `${setting.siteName}`;
  if (to.meta.title) {
    document.title = `${setting.siteName} . ${to.meta.title}`;
  }
  if (to.path === '/time') {
    store.commit('app/' + MT.LOADING, true);
  }
  next();
});
