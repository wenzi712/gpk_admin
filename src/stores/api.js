import config from '../config'
import axios from 'axios'
const baseUrl = `${config.api}/api/v1`

const request = create()

function create (url = baseUrl) {
  return axios.create({
    baseURL: url,
    timeout: 10000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    transformResponse: [function (data) {
      let json = {}
      try {
        json = JSON.parse(data)
      } catch (e) {
        json = {}
      }
      return json
    }]
  })
}

// Add a request interceptor
request.interceptors.request.use(function (config) {
  config.params = Object.assign({roles: 'dev'}, config.params)
  // store.commit('LOADING', true)
  return config
}, function (error) {
  // store.commit('LOADING', false)
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // store.commit('LOADING', false)
  return response
}, function (error) {
  // store.commit('LOADING', false)
  return Promise.reject(error)
})

request.account = create(`${config.account}/`)

export default request
