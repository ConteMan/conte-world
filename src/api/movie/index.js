import request from '@/request/http'
import base from '@/api/base'

const movie = {
  baseUrl: base.e_isconte + '/api/movies',

  /**
   * 列表
   */
  index(params) {
    const { offset, limit } = params
    return request({
      url: this.baseUrl,
      method: 'get',
      params: {
        offset,
        limit,
      }
    })
  },
}

export default movie
