import request from '@/request/http';
import base from '@/api/base';

const article = {
  baseUrl: base.e_isconte + '/api/articles',

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

  /**
   * 详情
   *
   * @param {Number} id - 文章 ID
   */
  docDetail(id) {
    return request({
      url: this.baseUrl + '/' + id,
      method: 'get',
    });
  }
};

export default article;
