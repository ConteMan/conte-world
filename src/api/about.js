import request from '@/request/http';
import base from '@/api/base';

const about = {
  baseUrl: base.api + '/about',

  /**
   * 详情
   */
  page() {
    return request({
      url: this.baseUrl,
      method: 'get',
    });
  },
};

export default about;
