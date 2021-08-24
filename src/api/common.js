import request from '@/request/http';
import base from '@/api/base';

const url = base.api;

const common = {
  base() {
    return request.get(url + '/base');
  },
};

export default common;
