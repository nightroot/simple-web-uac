import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Dynamic from '@/components/Dynamic'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }, {
      path: '/:system/:menu/:moudle',
      name: 'Dynamic',
      component: Dynamic,
      meta: { title: "动态渲染" }
    }
  ]
})

function checkpermits(to_path) {//路由权限检查
  let permits
  let permit = false
  if (store.state.user.permits != null) {
    permits = JSON.parse(store.state.user.permits)//权限列表
    permit = permits.filter(value => value == to_path).length == 0 ? false : true
  }
  return permit
}

router.beforeEach((to, from, next) => {
  //路由守卫 登录验证 权限验证
  // 登录验证 三个系统
  let topath = to.path.split('/').filter(d => d)
  switch (topath[0]) {//匹配系统
    case "sys"://后台管理系统
      if (topath[1] == 'admin') {//后台系统鉴权
        if (checkpermits(to.path) == false) {
          next({
            path: '/share/403'
          })
        } else {
          next()
        }
      }
      next()
      break;
    case "kttps"://知识系统
      console.log(topath[0])
      break;
    case "tpms"://课程系统
      console.log(topath[0])
      break;
    default:
      console.log('意外的请求')
      // 权限验证 
      next()

  }
})

export default router