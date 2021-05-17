import Vue from 'vue';
import router from '@/router';
import VueStorage from 'vue-ls';

// components
import '@/core/lazy_lib/components';

// setting
import setting from '@/config/setting'; // 全局配置

// extend
import VueGtag from 'vue-gtag';
import dayjs from 'dayjs';
import _ from 'lodash';

Vue.use(VueStorage, setting.storageOptions);

if (process.env.NODE_ENV === 'production') {
  Vue.use(
    VueGtag,
    {
      config: {
        id: process.env.VUE_APP_BASE_GA,
        params: {
          send_page_view: false,
        },
      },
    },
    router,
  );
}

Vue.prototype.$config = setting;
Vue.prototype.$dayjs = dayjs;
Vue.prototype._ = _;
