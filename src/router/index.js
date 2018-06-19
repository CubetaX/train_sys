import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import admin from '../pages/admin'
import AllStaff from '../components/AllStaff'
import PlanList from '../components/PlanList'
import PlanStaff from '../components/PlanStaff'
import Welcome from '../components/Welcome'
Vue.use(Router)
export default new Router({
 // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component:admin,
      props: true,
      children:[
        {
          path: '/admin/welcome',
          component: Welcome,
          props: true,
        },
        {
          path: '/admin/allStaff',
          component: AllStaff
        },
        {
          path: '/admin/planList',
          component: PlanList,
          children:[
            {
            path: '/admin/planList/:planId',
            component: PlanStaff,
            props: true
           }
          ],
        }
      ]
    },

  ]
})
