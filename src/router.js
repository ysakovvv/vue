import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from './pages/Home.vue'
import AboutView from './pages/Aboute.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
