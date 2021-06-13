import request from '@/request/http';
import base from '@/api/base';

const project = {
  baseUrl: base.e_isconte + '/api/notion',

  /**
   * notion 请求
   *
   * @param {String} type - database, page, block
   * @param {String} action - retrieve, query
   * @param {Object} params - 参数
   */
  index({ type, action, params } = {}) {
    return request({
      url: this.baseUrl,
      method: 'post',
      data: {
        type,
        action,
        params,
      },
    });
  },
};

export default project;
