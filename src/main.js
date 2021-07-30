// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
window.bus = new Vue()
window.bus2 = new Vue()
window.bus = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    dataType: 'json',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
axios.interceptors.request.use(config => {
  config.headers.token = window.localStorage.getItem('token')
  return config
}, error => {
  console.log('加载超时')
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  if (response.data.status === -1) {
    window.localStorage.removeItem('user')
    window.bus.$router.replace({
      name: 'login'
    })
  } else if (response.data.status === -2) {
    window.bus.$router.replace({
      name: 'login'
    })
  } else {
    if (response.headers.refresh != null) {
      window.localStorage.setItem('token', response.headers.refresh)
    }
    return response
  }
}, error => {
  console.log('加载失败')
  return Promise.reject(error)
})
export const getRequest = (url, data) => {
  return axios({
    method: 'get',
    params: data,
    url: url
  })
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default axios
window.axios = require('axios')
