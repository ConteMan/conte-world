import router from '@/router';
import config from '@/config';
import store from '@/store';
import * as MT from '@/store/mutation-types';

router.beforeEach(async (to, from, next) => {
  document.title = `${config.siteName}`;
  if (to.meta.title) {
    document.title = `${config.siteName} . ${to.meta.title}`;
  }
  if (to.path === '/time') {
    store.commit('app/' + MT.LOADING, true);
  }
  next();
});
