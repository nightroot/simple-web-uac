import axios from 'axios'
// 引入vuex的store
import store from '@/store/index'
import iView from 'iview'
// 引入加解密包
import CryptoJS from 'crypto-js'

const Axios = axios.create({
  // baseURl 是axios在每次访问的 基准域
  // baseURL: 'http://localhost:8088',//本地调试域
  // baseURL: 'http://ali.teasword.com:8088',//联调域
  baseURL: 'https://www.fastmock.site/mock/e860d1ff85444a2df9c65185d9324574/mock',//模拟测试域
  timeout: 3000,// 超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }// 请求头
})

// axios的访问前钩子
Axios.interceptors.request.use(function (config) {
  // console.log(config)
  // 全局调用 iview 库的 LoadingBar
  iView.LoadingBar.start()
  return config
}, function (error) {
  return Promise.reject(error)
})

// axios响应后的钩子
Axios.interceptors.response.use(function (response) {
  // 返回数据规范：
  // {
  //   code: 1, 返回的状态码，标识返回数据是否正常
  //   msg: '返回的提示',
  //   data: 'balabalabala~', 加密后的业务数据
  // }

  // 先判断状态码是否正常 1为正常
  if (response.data.code !== 1) {
    console.log(response.data.code)//报错
    // 调用LoadingBar的error方法来提示用户返回社保
    iView.LoadingBar.error()
    // 调用Message的warning方法弹窗来提示用户失败原因
    iView.Message.warning(response.data.msg)
    // 对于异常状态码，直接返回 false，提示之后的操作
    return false
  }
  //请求与返回数据
  let request = JSON.parse(response.config.data)//请求数据
  console.log(request)
  console.log(response.data)
  //获取加密key 由前端传入后台 正式密钥生成
  let keyHex = CryptoJS.enc.Utf8.parse(request.timestamp + "store.state.user.token")
  // console.log(request.timestamp + "store.state.user.token")
  // console.log(response.config.data)
  // let keyHex = CryptoJS.enc.Utf8.parse('1234567890qwertyuiopasdfghjklzxcvbnm') // 测试密钥
  let tmpmingwen = JSON.stringify(response.data.data)//待加密明文字符串
  // console.log(tmpmingwen)//待加密字符串
  //加密阶段
  let tmpencrypted = CryptoJS.TripleDES.encrypt(tmpmingwen, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString()
  // 得到加密数据
  let encrypted = tmpencrypted
  // console.log(encrypted)//加密字符串
  //解密得到明文数据  加密模式ECB，填充方式Pkcs7
  let data = CryptoJS.TripleDES.decrypt(encrypted, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
  // console.log(data)//解密字符串

  // 解密结束，调用LoadingBar.finis提示用户加载成功
  iView.LoadingBar.finish()
  // 返回业务数据
  // return JSON.parse(response.data.data)
  return response.data.data
  // return data
}, function (error) {
  // 响应错误，调用iview的全局函数来报错
  iView.LoadingBar.error()
  iView.Message.warning('网络错误，请检查网络状态~')
  // 返回错误
  return Promise.reject(error)
})

// 这里是暴露出去的方法
// 这里我只封装了post请求的方法，我们也可以根据需要封装不同请求
function post(requrl, reqparam) {
  // 获取时间戳用来加密
  let timestamp = (Date.parse(new Date()) / 1000).toString()
  // 编辑post数据
  let postData = {
    timestamp: timestamp,
    // 因为使用分模块的vuex来保存，所以我引入store来获取token
    token: store.state.user.token,
    // 这里我们规定业务数据要转成字符串
    data: reqparam
  }
  // 执行并返回promise
  return Axios({
    method: 'post',
    url: requrl,
    data: postData,
  })
}

function api(requrl, reqparam, callback) {
  let result = post(requrl, reqparam).then(result => {
    callback(result)
  })
}

// 向外暴露出我们的post方法
export default post