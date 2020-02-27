import request from "@/request/http"
import base from "@/api/base"
import qs from "qs"

const one = {
    ones() {
        return request.get(`${base.k_isconte}/one/random`)
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
    },

    //更新数据，获取最新数据存入数据库
    update(data) {
        var requestData = {
            f: data.f || undefined,
            start: data.start || 0,
            end: data.end || 0,
            type: data.type || 'one',
        }
        return request({
            url: `${base.k_isconte}/one/store`,
            method: 'post',
            data: qs.stringify(requestData)
        })
    }
}

export default one;