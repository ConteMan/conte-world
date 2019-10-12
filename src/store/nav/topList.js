import api from "@/api"

export default {
    state: {
        types: {},
        infos: []
    },
    getter:{
        typeInfo: state => state.infos
    },
    mutations: {
        setTypes (state, types) {
            state.types = types
        },
        setTypeInfo(state, data){
            state.infos[data.id] = data.info
        }
    },
    actions: {
        getTypes({commit}){
            api.topList.getType().then( (response) => {
                commit('setTypes', response.data.Data)
            })
        },
        getTypeInfo({commit, state}, id){
            api.topList.getTypeInfo(id).then( (response) => {
                var res = {'id': id, 'info': response.data.Data}
                commit('setTypeInfo', res)
            })
        }
    }
}
