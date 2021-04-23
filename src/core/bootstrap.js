import Vue from 'vue';
import store from '@/store';

import * as MT from '@/store/mutation-types';
import setting from '@/config/setting';

export default async function() {
  const menuStatus = Vue.ls.get(setting.storageKeys.menuStatus, setting.menuStatus);
  const layoutMode = Vue.ls.get(setting.storageKeys.layoutMode, setting.layoutMode);
  store.commit('app/' + MT.MENU_STATUS, menuStatus);
  store.commit('app/' + MT.LAYOUT_MODE, layoutMode);
  store.commit('app/' + MT.LOADING, true);
  await store.dispatch('app/init');
}
