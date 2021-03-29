import request from '@/request/http';
import base from '@/api/base';

const worldline = {
  // BASE URL
  baseUrl: base.e_isconte + '/api/worldlines',

  /**
   * 列表
   *
   * @param {Object} params - 参数
   */
  index(params) {
    const { offset, limit, platformType } = params;
    return request({
      url: this.baseUrl,
      method: 'get',
      params: {
        offset,
        limit,
        platformType,
      }
    });
  },

  /**
   * 平台类型
   */
  platformTypes() {
    return request({
      url: this.baseUrl + '/platform_types',
      method: 'get',
    });
  }
};

export default worldline;
