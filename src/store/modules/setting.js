// initial state
const state = {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: 'Va Admin',
    copyright: 'Va Admin',
    footerLinks: [
        {link: 'https://pro.ant.design', name: 'Pro首页'},
        {link: 'https://github.com/iczer/vue-antd-admin', icon: 'github'},
        {link: 'https://ant.design', name: 'Ant Design'}
    ],
    multipage: true
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
    setDevice (state, isMobile) {
        state.isMobile = isMobile
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}