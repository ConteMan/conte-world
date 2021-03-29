import request from '@/request/http';
import base from '@/api/base';

const url = base.e_isconte + '/api';

const common = {
  socials() {
    return request.get(url + '/socials');
  },
  base() {
    return request.get(url + '/base');
  }
};

export default common;
