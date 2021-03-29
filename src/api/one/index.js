import request from '@/request/http';
import base from '@/api/base';

const one = {
  ones() {
    return request.get(`${base.e_isconte}/api/ones/random`);
  },
};

export default one;
