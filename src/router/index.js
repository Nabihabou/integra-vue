import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import LoginComponent from '@/components/Login'
import Header from '@/components/Header'
import Calendar from '@/components/Calendar'
import Attendance from '@/components/Attendance'
import Profile from '@/components/Profile'
import Projects from '@/components/Projects'
import StyleGuide from '@/components/Styles'
import EaAttendance from '@/components/EaAttendance'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Header',
      component: Header,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/calendar',
          name: 'Calendar',
          component: Calendar
        },
        {
          path: '/attendance',
          name: 'Attendance',
          component: Attendance
        },
        {
          path: '/attendance/:index',
          name: 'EaAttendance',
          component: EaAttendance
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/projects',
          name: 'Projects',
          component: Projects
        },
      ]
    },
    {
    	path: '/login',
    	name: 'LoginComponent',
    	component: LoginComponent
    },
    {
      path: '/styleguide',
      name: 'styles',
      component: StyleGuide
    }
  ]
})
