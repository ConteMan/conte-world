import axios from '../../request/http'
import base from '../base'

const v2ex = {
    hot() {
        return axios.get(`${base.apiIsConte}/v2ex/hot`)
    }
}

export default v2ex;