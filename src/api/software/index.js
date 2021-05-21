import request from '@/request/http';
import base from '@/api/base';

const about = {
  baseUrl: base.e_isconte + '/api/softwares',

  /**
   * 列表
   *
   * @param {Object} param0 - 参数
   * - @param {Number} offset - 偏移
   * - @param {Number} limit - 限制
   * - @param {String} tag - 标签 ID 字符串，半角逗号分隔
   */
  index(params) {
    const { offset, limit, tag } = params;

    return request({
      url: this.baseUrl,
      method: 'get',
      params: {
        offset,
        limit,
        tag,
      },
    });
  },

  /**
   * 标签列表
   */
  tags() {
    return request({
      url: this.baseUrl + '/tags',
      method: 'get',
    });
  },
};

export default about;
