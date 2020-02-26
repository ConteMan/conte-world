import request from "@/request/http"
import qs from "qs"
import base from "@/api/base"

const user = {
    login(data) {
        var requestData = {
            username: data.username,
            password: data.password,
        }
        return request({
            url: `${base.k_isconte}/users/login`,
            method: 'post',
            data: qs.stringify(requestData)
        })
    },
    info() {
        return request({
            url: `${base.k_isconte}/user`,
            method: 'get',
        })
    }
}

export default user;