import axios from 'axios';
import store from './store/index';
import router from './router/index';
import { Notification } from 'element-ui';
import { getToken, setToken, removeToken } from './utils/token';

// 全局配置
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = myConfig.httpRequestTimeout * 1000;

// 请求拦截
axios.interceptors.request.use(config => {
  // 添加token
  const token = getToken();
  if (token) {
    config.headers.common['authorization'] = token;
  }
  if (store && store.state.user) {
    config.headers.common['username'] = store.state.user.username;
    config.headers.common['deviceType'] = store.state.user.deviceType;
  }
  // 添加默认url, 需要后台支持 CORS 跨域
  if (myConfig.baseURL && myConfig.baseURL !== '') {
    config.baseURL = myConfig.baseURL;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(async response => {
  if (response.data && response.data.code === 1004) {
    // 刷新token状态：重新设置token并发起请求
    const result = response.data || {};
    setToken(result.data.refreshToken);
    const newConfig = { ...response.config };
    newConfig.headers['authorization'] = result.data.refreshToken;
    // 重新发起请求
    response = await axios.request(newConfig);
    return handleResult(response);
  } else {
    return handleResult(response.data);
  }
}, error => {
  // 请求失败隐藏loading
  store.dispatch('changeLoading', false);
  if (error.response && error.response.status === 401) {
    toLoginPage();
  }
  if (error.response && error.response.data) {
    Notification.error({
      title: '错误',
      message: error.response.data.message
    });
  }
  if (!error.response) {
    Notification.error({
      title: '错误',
      message: error.message
    });
  }
  return Promise.resolve(error.response);
});

/**
 * 跳转到登录页面
 */
function toLoginPage() {
  router.push('/login');
}

function handleResult(result = {}) {
  if (typeof result.code === 'number') {
    // 后台返回的json数据
    let ok = false;
    if (result.code === 1) {
      ok = true;
    } else {
      handleError(result);
    }
    return {
      ok,
      ...result
    };
  } else {
    // 文件流等
    return {
      ok: true,
      data: result
    };
  }
}

/**
 * 处理系统异常
 */
function handleError(result) {
  // 处理失败隐藏loading
  store.dispatch('changeLoading', false);

  Notification.error({
    title: '错误',
    message: result.msg
  });
  // 令牌过期
  if (result.code === 1001) {
    removeToken();
    toLoginPage();
  }
}

