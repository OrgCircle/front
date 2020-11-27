import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

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
  }
]

const router = new VueRouter({
  routes
})

let isLogin = () => {
  if (store.auth.isAuthenticated)
    return true;

  

  return false
}

const exceptedRoute = ['Register', 'Home']

router.beforeEach((to, from, next) => {
  if (!exceptedRoute.some(routeName => to.name === routeName) && isLogin) 
    next({ name: 'Home' });
  else next()
})

export default router
