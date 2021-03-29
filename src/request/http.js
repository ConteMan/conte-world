import axios from 'axios';
import Message from 'ant-design-vue/lib/message';

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401
    case 401:
      break;
    // 403
    case 403:
      break;
    // 404
    case 404:
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.get['Content-Type'] = 'application/json';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.error(error));

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      Message.error(response.data.message);
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        Message.error('网络异常');
      } else {
        return Promise.reject(error);
      }
    }
  });

export default instance;

