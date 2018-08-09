import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
const LoginComponent = () => import('@/components/Login')
const Header = () => import('@/components/Header')
const Calendar = () => import('@/components/Calendar')
const Attendance = () => import('@/components/Attendance')
const Profile = () => import('@/components/Profile')
const Projects = () => import('@/components/Projects')
const StyleGuide = () => import('@/components/Styles')
const EaAttendance = () => import('@/components/EaAttendance')
const AttendanceEach = () => import('@/components/AttendanceEach')
const CreateAttendance = () => import('@/components/CreateAttendance')
const ProjectView = () => import('@/components/ProjectView')
const ProjectMembers = () => import('@/components/ProjectMembers')
const CreateEvent = () => import('@/components/CreateEvent')
const Memos = () => import('@/components/Memos')
// const CalendarDay = () => import('@/components/CalendarViewDay')

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
        // {
        //   path: '/calendar/:day',
        //   name: 'CalendarViewDay',
        //   component: CalendarDay
        // },
        {
          path: '/calendar/create',
          name: 'CreateEvent',
          component: CreateEvent
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
          path: '/attendance/:index/:id',
          name: 'AttendanceEach',
          component: AttendanceEach
        },
        {
          path: '/createatt',
          name: 'CreateAttendance',
          component: CreateAttendance
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
        {
          path: '/projects/:name/:index',
          name: 'ProjectView',
          component: ProjectView
        },
        {
          path: '/projects/:name/:index/members',
          name: 'ProjectMembers',
          component: ProjectMembers
        },
        {
          path: '/oficios',
          name: 'Memos',
          component: Memos
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
    },
  ]
})
