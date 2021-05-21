import Vue from 'vue';
import Router from 'vue-router';

import landpage from '@/router/modules/landpage.js';
import article from '@/router/modules/article.js';
import movie from '@/router/modules/movie.js';
import talk from '@/router/modules/talk.js';
import about from '@/router/modules/about.js';
import time from '@/router/modules/time.js';
import book from '@/router/modules/book.js';
import software from '@/router/modules/software.js';

Vue.use(Router);

export const routes = [
  landpage,
  article,
  movie,
  talk,
  about,
  time,
  book,
  software,
  {
    path: '*',
    name: '404',
    meta: {
      title: '404',
    },
    redirect: { path: '/' },
  },
];

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const createRouter = function() {
  return new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes,
  });
};

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
