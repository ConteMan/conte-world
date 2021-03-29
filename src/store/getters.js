const getters = {
  loading: state => state.app.loading,
  darkMode: state => state.app.darkMode,
  menuStatus: state => state.app.menuStatus,
  isMobile: state => state.app.isMobile,
  contentHeight: state => state.app.contentHeight,
  info: state => state.app.info,
};

export default getters;
