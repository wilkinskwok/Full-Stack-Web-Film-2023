// Has to install the below packages beforehand
//npm i vue-router
//npm i quasar @quasar/extras @quasar/vite-plugin

import { createApp } from 'vue'
import App from './App.vue'

import {Quasar} from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import router from './router'
import {createStore} from 'vuex'



const sessionStore = createStore({
  state:{
    session:null
  },
  getters:{
    getSession: state=>{
      return state.session
    }
  },
  mutations:{
    updateSession(state, keyRole){
      state.session = keyRole
    }
  }
})

//import './assets/main.css'

//Method 1 to declar the APP
//createApp(App).use(router).use(Quasar).mount('#app')

//Method 2
const app = createApp(App)
app.use(router)
app.use(Quasar)
app.use(sessionStore)
app.mount('#app')

