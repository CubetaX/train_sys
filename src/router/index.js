import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import staff from '../pages/staff'
import admin from '../pages/admin'
import AllStaff from '../components/AllStaff'
import PlanList from '../components/PlanList'
import PlanStaff from '../components/PlanStaff'
import Welcome from '../components/Welcome'
import UserInfo from '../components/UserInfo'
Vue.use(Router)
export default new Router({
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
      path: '/staff',
      name: 'staff',
      component:staff,
      props: true,
      children:[
        {
          path: '/staff/welcome',
          component: Welcome,
          props: true,
        },
        {
          path: '/staff/userInfo/:id',
          component: UserInfo,
          props: true
        },
        {
          path: '/staff/planList',
          component: PlanList,
        }
      ]
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
          path: '/admin/userInfo/:id',
          component: UserInfo,
          props: true
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
