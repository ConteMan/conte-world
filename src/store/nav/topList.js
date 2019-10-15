import api from "@/api"
import Vue from "vue"

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
            var infos = state.infos
            infos[data.id] = data.info
            var newInfo = {}
            Object.assign(newInfo, infos)
            state.infos = newInfo
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
