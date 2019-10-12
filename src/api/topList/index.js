import axios from '../../request/http'
import base from '../base'

const topList = {
    getType() {
        return axios.get(`${base.apiTopList}/GetType`)
    },
    getTypeInfo(id) {
        return axios.get(`${base.apiTopList}/GetTypeInfo?id=`+id)
    }
}

export default topList;