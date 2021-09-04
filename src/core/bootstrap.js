import store from '@/store';
import { useStorage } from '@vueuse/core';

import * as MT from '@/store/mutation-types';
import config from '@/config';

export default async function() {
  // 开启加载动画
  store.commit('app/' + MT.LOADING, true);

  // 从本地缓存获取配置
  const menuStatus = useStorage(config.storageKeys.menuStatus);
  const menuStatusValue = !menuStatus.value ? config.menuStatus : menuStatus.value;
  menuStatus.value = menuStatusValue;

  store.commit('app/' + MT.MENU_STATUS, menuStatusValue);

  // 初始化，获取首页信息等
  await store.dispatch('app/init');
}
