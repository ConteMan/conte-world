import base from '../base';
import axios from '../../request/http'
//import QS from 'qs'

const movie = {
    genresForPie() {
        return axios.get(`${base.base}/api/movie/genresForPie`)
    }
}

export default movie;