import request from '@/request/http';
import base from '@/api/base';

const douban = {
  movieCollect(params) {
    var requestData = {
      id: params.id || 'bolu_zz',
      start: params.start || 1,
      sort: params.sort || 'time',
      rating: params.rating || 'all',
      filter: params.filter || 'all',
      mode: params.mode || 'grid',
    };
    return request({
      url: `${base.e_isconte}/api/douban/movie_collect`,
      method: 'get',
      params: requestData
    });
  }
};

export default douban;
