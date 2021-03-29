import Vue from 'vue';
import { routes } from '@/router';
import * as MT from '@/store/mutation-types';
import setting from '@/config/setting';

// remove 404 route
routes.pop();

const permission = {
  namespaced: true,
  state: {
    routes,
  },
  mutations: {
    [MT.ROUTES]: (state, data) => {
      state.routes = data;
      Vue.ls.set(setting.storageKeys.routes, data);
    },
    RESET_ROUTES: (state) => {
      state.routes = routes;
      Vue.ls.set(setting.storageKeys.routes, routes);
    }
  },
  actions: {}
};

export default permission;
