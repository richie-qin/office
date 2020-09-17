import axios from 'axios'

function getCookie(objName) {//获取指定名称的cookie的值
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=");
      if (temp[0] == objName) return unescape(temp[1]);  //解码
  }
  return "";
}

const TGT = getCookie("TGT")
  
// 根据环境不同引入不同api地址
// create an axios instance
var baseUrl = `//${location.hostname}`; //服务器地址
if (location.hostname == "localhost") {
  baseUrl = "/api";
}

const service = axios.create({
  baseURL: baseUrl, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers:{WEBTGT:TGT}
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // window.startLoading();
    }
    // if (store.getters.token) {
    //   config.headers['X-Token'] = ''
    // }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    // window.endLoading();
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      // if (res.status === 401) {
      // store.dispatch('FedLogOut').then(() => {
      //   location.reload()
      // })
      // }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    // window.endLoading();
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      window.Toast("请求超时")
    }
    return Promise.reject(error)
  }
)

export default service