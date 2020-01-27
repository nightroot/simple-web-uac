import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dynamic from '@/components/Dynamic'

Vue.use(Router)

const router =new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/:system/:moudle/:method',
      name: 'Dynamic',
      component: Dynamic,
      meta: { title: "动态渲染" }
    }
  ]
})

router.beforeEach((to, from, next)=>{
  //路由守卫 登录验证
  next()
})


export default router