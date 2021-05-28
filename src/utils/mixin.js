import { mapState, mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

const mixin = {
  computed: {
    ...mapState({
      darkMode: (state) => state.app.darkMode,
      menuStatus: (state) => state.app.menuStatus,
      isMobile: (state) => state.app.isMobile,
      clientWidth: (state) => state.app.clientWidth,
      headerHeight: (state) => state.app.headerHeight,
      contentHeight: (state) => state.app.contentHeight,
      routes: (state) => state.permission.routes,
      info: (state) => state.app.info,
      headerPin: (state) => state.app.headerPin,
      layoutMode: (state) => state.app.layoutMode,
    }),
  },
  methods: {
    ...mapMutations('app', {
      headerHeightAction: MT.HEADER_HEIGHT,
      headerPinAction: MT.HEADER_PIN,
      layoutModeAction: MT.LAYOUT_MODE,
    }),
  },
};

const appMixin = {
  computed: {
    ...mapState({
      loading: (state) => state.app.loading,
    }),
  },
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
      isMobileAction: MT.IS_MOBILE,
      clientWithAction: MT.CLIENT_WIDTH,
      contentHeightAction: MT.CONTENT_HEIGHT,
    }),
  },
};

const articleMixin = {
  computed: {
    ...mapState({
      clientWidth: (state) => state.app.clientWidth,
      showList: (state) => state.article.showList,
    }),
  },
  methods: {
    ...mapMutations('article', {
      showListAction: MT.ARTICLE_SHOW_LIST,
    }),
  },
};

const contentHeaderMixin = {
  computed: {
    ...mapState({
      clientWidth: (state) => state.app.clientWidth,
      showList: (state) => state.article.showList,
      headerHeight: (state) => state.app.headerHeight,
      headerPin: (state) => state.app.headerPin,
    }),
  },
  methods: {
    ...mapMutations('article', {
      showListAction: MT.ARTICLE_SHOW_LIST,
    }),
    ...mapMutations('app', {
      headerHeightAction: MT.HEADER_HEIGHT,
      headerPinAction: MT.HEADER_PIN,
    }),
  },
};

export { mixin, appMixin, articleMixin, contentHeaderMixin };
