import axios from '../../request/http'
import base from '../base'

const one = {
    ones() {
        return axios.get(`${base.apiIsConte}/ones`)
    }
}

export default one;