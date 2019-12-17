import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Public from '@/components/public'
import Details from '@/components/details'
// 二级路由
import Index from '@/components/twoPath/index'
import Logon from '@/components/denglu/logon'
import Register from '@/components/denglu/register'
import Mine from '@/components/twoPath/mine'
import Sort from '@/components/twoPath/sort'
import Buycar from '@/components/twoPath/buycar'

Vue.use(Router)
const route = new Router({
  mode:'history',
  scrollBehavior(to, from, savedPosition){
    console.log(to);
    console.log(from);
    console.log(savedPosition);
    // to到哪里去
    // 从哪里来
    // savedPosition 会在你使用浏览器前进或后退按钮时候生效
   // 这个跟你使用 router.go() 或 router.back() 效果一致
   if (savedPosition) {
        return savedPosition
      } else {
        // 如果不是通过上述行为切换组件，就会让页面回到顶部
        return {x: 0, y: 0}
    }
    
    
},
  routes: [{
      path: '/public',
      component: Public,
      children: [{
          path: '/index',
          component: Index
        },
        {
          path: '/buycar',
          component: Buycar
        },
        {
          path: '/sort',
          component: Sort
        },
        {
          path: '/mine',
          component: Mine
        },
        {
          path: '*',
          redirect: '/index'
        },

      ]
    },
    {
      path: '/details',
      component: Details
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/logon',
      component: Logon
    },
    {
      path:'*',
      redirect:'/index'
    }



  ]
})


export default route