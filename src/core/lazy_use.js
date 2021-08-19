import Vue from 'vue';

// components
import '@/core/lazy_lib/components';

// config 全局配置
import config from '@/config';

// extend
import dayjs from 'dayjs';
import _ from 'lodash';

Vue.prototype.$config = config;
Vue.prototype.$dayjs = dayjs;
Vue.prototype._ = _;
