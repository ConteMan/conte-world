import router from "@/router";
import setting from "@/config/setting";
import store from "@/store";
import * as MT from "@/store/mutation-types";

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - " + setting.siteName;
  }
  if (to.path === "/time") {
    store.commit("app/" + MT.LOADING, true);
  }
  // 内容头部复位
  store.commit("app/" + MT.HEADER_HEIGHT, setting.headerHeight);

  next();
});
