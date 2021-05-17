import request from '@/request/http';
import qs from 'qs';
import base from '@/api/base';

const user = {
  login(data) {
    let requestData = {
      username: data.username,
      password: data.password,
    };
    return request({
      url: `${base.k_isconte}/users/login`,
      method: 'post',
      data: qs.stringify(requestData)
    });
  },
  info() {
    return request({
      url: `${base.k_isconte}/user`,
      method: 'get',
    });
  },
  setting() {
    return request({
      url: `${base.k_isconte}/user/setting`,
      method: 'get',
    });
  },
  updateSetting(data) {
    return request({
      url: `${base.k_isconte}/user/setting`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default user;
