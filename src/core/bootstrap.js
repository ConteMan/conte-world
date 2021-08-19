import store from '@/store';
import { useStorage } from '@vueuse/core';

import * as MT from '@/store/mutation-types';
import config from '@/config';

export default async function() {
  // 从本地缓存获取配置
  let menuStatus = useStorage(config.storageKeys.menuStatus);
  menuStatus = menuStatus ? menuStatus : config.menuStatus;
  let layoutMode = useStorage(config.storageKeys.layoutMode);
  layoutMode = layoutMode ? layoutMode : config.layoutMode;
  store.commit('app/' + MT.MENU_STATUS, menuStatus);
  store.commit('app/' + MT.LAYOUT_MODE, window.innerWidth <= config.staticWidth ? 'fit' : layoutMode);
  store.commit('app/' + MT.LOADING, true);

  // 初始化，获取首页信息等
  await store.dispatch('app/init');
}
