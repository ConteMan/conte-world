import request from '@/request/http';
import base from '@/api/base';

const yuque = {
  docs() {
    return request.get(`${base.k_isconte}/yuque/docs`);
  },
  docDetail(id) {
    return request({
      url: `${base.k_isconte}/yuque/docs/` + id,
      method: 'get',
    });
  }
};

export default yuque;
