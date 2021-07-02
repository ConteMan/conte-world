import Vue from 'vue';
import VueStorage from 'vue-ls';

// components
import '@/core/lazy_lib/components';

// setting
import setting from '@/config/setting'; // 全局配置

// extend
import dayjs from 'dayjs';
import _ from 'lodash';

Vue.use(VueStorage, setting.storageOptions);

Vue.prototype.$config = setting;
Vue.prototype.$dayjs = dayjs;
Vue.prototype._ = _;
