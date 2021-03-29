import Vue from 'vue';
import router from '@/router';
import VueStorage from 'vue-ls';

// components
import '@/core/lazy_lib/components';

// setting
import setting from '@/config/setting'; // 全局配置

// extend
import VueAnalytics from 'vue-analytics';
import dayjs from 'dayjs';
import _ from 'lodash';

Vue.use(VueStorage, setting.storageOptions);

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_BASE_GA,
    disableScriptLoader: false,
    router,
    autoTracking: {
      pageviewOnLoad: true
    }
  });
}

Vue.prototype.$config = setting;
Vue.prototype.$dayjs = dayjs;
Vue.prototype._ = _;
