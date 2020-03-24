import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../components/Search.vue'
import Song from '../components/Song.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/search',
    component: Search
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/song/:id',
    name: 'Song',
    component: Song
  }
]

const router = new VueRouter({
  routes
})

export default router
