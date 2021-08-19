import { useStorage } from '@vueuse/core';
import { routes } from '@/router';
import * as MT from '@/store/mutation-types';
import config from '@/config';

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
      useStorage(config.storageKeys.routes, data);
    },
    RESET_ROUTES: (state) => {
      state.routes = routes;
      useStorage(config.storageKeys.routes, routes);
    },
  },
  actions: {},
};

export default permission;
