import request from '@/request/http';
import base from '@/api/base';

export default {
  baseUrl: base.e_isconte + '/api/talks',

  /**
   * 列表
   *
   * @param {Object} param0 - 参数
   * - @param {Number} offset - 偏移
   * - @param {Number} limit - 限制
   */
  index(params) {
    const { offset, limit } = params;
    return request({
      url: this.baseUrl,
      method: 'get',
      params: {
        offset,
        limit,
      }
    });
  },
};
