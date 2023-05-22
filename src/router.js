import { createWebHistory,createRouter } from "vue-router"
import Home from './components/Home.vue'
import AddFilm from './components/AddFilm.vue'
import About from './components/About.vue'
import Staff from './components/StaffInfo.vue'
import FilmDetail from './components/DetailsFilm.vue'
import NotFound from './components/NotFound.vue'

const routes = [
  {
    path:"/",
    name: "Home",
    component: Home
  },  
  {
    path:"/addfilm",
    name: "AddFilm",
    component: AddFilm
  },
  {
    path:"/about",
    name: "About",
    component: About
  },  
  {
    path:"/staff",
    name:"Staff",
    component: Staff
  },
  {
    path:"/d/:id",
    name: "FilmDetail",
    component: FilmDetail
  }, 
  {    
    path:"/:catchAll(.*)",
    component: NotFound  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router