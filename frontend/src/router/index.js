import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import map from '../views/map.vue'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import logPage from '../views/log-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: logPage
  },
  {
    path: '/map',
    name: 'Map',
    component: map
  },
  {
    path: '/toy',
    name: 'Toy',
    component: toyApp
  },
  {
    path: '/toy/details/:toyId',
    component: toyDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
