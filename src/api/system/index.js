import request from '@/request/http';
import base from '@/api/base';

const system = {
  changelog() {
    return request.get(`${base.k_isconte}/system/changelog`);
  }
};

export default system;
