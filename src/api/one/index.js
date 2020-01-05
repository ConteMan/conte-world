import axios from "@/request/http"
import base from "@/api/base"

const one = {
    ones() {
        return axios.get(`${base.api_conte}/ones`)
    }
}

export default one;