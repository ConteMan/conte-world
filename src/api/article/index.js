import request from '@/request/http'
import base from '@/api/base'

const article = {
  docs() {
    return request.get(`${base.e_isconte}/api/articles`)
  },
  docDetail(id) {
    return request({
      url: `${base.e_isconte}/api/articles/` + id,
      method: 'get',
    })
  }
}

export default article
