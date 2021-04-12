import request from '@/request/http';
import base from '@/api/base';

const book = {
  baseUrl: base.e_isconte + '/api/books',

  /**
   * 列表
   *
   * @param {Object} param0 - 参数
   * - @param {String} type - 类型
   * - @param {Number} offset - 偏移
   * - @param {Number} limit - 限制
   */
  index(params) {
    const { type, offset, limit } = params;
    return request({
      url: this.baseUrl,
      method: 'get',
      params: {
        type,
        offset,
        limit,
      }
    });
  },

  /**
   * 类型
   */
  types() {
    return request({
      url: this.baseUrl + '/types',
      method: 'get',
    });
  },
};

export default book;
