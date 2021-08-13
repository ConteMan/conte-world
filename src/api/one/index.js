import request from '@/request/http';
import base from '@/api/base';

const one = {
  ones() {
    return request.get(`${base.api}/api/ones/random`);
  },
};

export default one;
