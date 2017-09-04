import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Alcohol from '@/components/Alcohol'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // front end routes only
      path: '/',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Alcohol/',
      name: 'Alcohol',
      component: Alcohol
    }
  ]
})
