import request from "@/request/http"
import base from "@/api/base"

const one = {
    ones() {
        return request.get(`${base.api_isconte}/ones`)
    },
    ajaxList(data) {
        var requestData = {
            type: data.type || '', //one | article | music | movie
            id: data.id || 0,
        }
        return request({
            url: `${base.k_isconte}/one/ajaxlist`,
            method: 'get',
            params: requestData
        })
    }
}

export default one;