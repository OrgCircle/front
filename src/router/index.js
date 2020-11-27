import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import('../views/Lists.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  }
]

const router = new VueRouter({
  routes
})

const exceptedRoute = ['Register', 'Home']

router.beforeEach((to, from, next) => {
  if (!exceptedRoute.some(routeName => to.name === routeName)) 
    next({ name: 'Home' });
  else next()
})

export default router
