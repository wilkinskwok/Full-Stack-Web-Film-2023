<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>          
          My Film Shop               
        </q-toolbar-title>  

        <q-space />
      	<div v-if="!isLogin">
      	  <q-btn color="secondary" @click="signCard=true" >
            Sign In
          </q-btn>
      	</div>        
      	<div v-if="isLogin">
      	  <q-btn color="secondary" @click="logout" >Logout</q-btn>          
      	</div>       
      </q-toolbar>     
      
      <q-tabs align="left">
        <q-route-tab to="/" label="Home" />        
        <q-route-tab to="/Staff" label="Staff" v-if="isLogin && isStaff"/>                  
        <q-route-tab to="/AddFilm" label="Add Film" v-if="isLogin && isStaff"/>        
        <q-route-tab to="/about" label="About" />        
      </q-tabs>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>          
          <div> 
            {{ currentTime }}           
          </div>                     
        </q-toolbar-title>       
        <q-space />
            <div> {{ weatherText }} </div>
      </q-toolbar>
    </q-footer>

  </q-layout>

  <q-dialog v-model="signCard">
    <q-card class="my-card">
      <q-card-section>
        <q-input hint="username" v-model="un" :error="!isUNValid" error-message="Required"/>
        <q-input :type="isPwd?'password':'text'" hint="Password" v-model="pwd" :error="!isPwdValid" error-message="Required">
            <template v-slot:append>
              <q-icon :name="isPwd? 'visibility_off': 'visibility'" class="cursor-pointer" @click="isPwd=!isPwd" />
            </template>
          </q-input>
        </q-card-section>
        <q-separator />
        <q-card-section>
        <p class="text-negative">{{errMsg}}</p>
        </q-card-section>
        <q-card-actions align="right">
        <q-btn flat color="primary" label="Login" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>  

  
  
</template>

<script>

  import {computed, ref} from 'vue'
  import axios from 'axios';
  import url from './http-common.js'
  import {Buffer} from 'buffer'
  
  
export default {
  
  data () {
    return {
      currentTime: '',
      weather: null,
      weatherText: "",
      isLogin: false,
      signCard: false,
      isUNValid: true,
      isPwdValid: true,      
      isValid: false,
      isPwd: true,
      isStaff: false,
      un:'',
      pwd:'',
      errMsg:'',
      logonToken:''
    }
  },
  methods:{
    onSubmit(){
      this.isUNValid = computed(()=>this.un.length>0)
      this.isPwdValid = computed(()=>this.pwd.length>0)
      this.isValid = this.isUNValid && this.isPwdValid
      
      if (this.isValid){
        //step 1: Create token username:password
        const token = `${this.un}:${this.pwd}`
        //step 2: Encode the token to base64 format
        const encodedToken = Buffer.from(token).toString('base64')
        this.logonToken = encodedToken
        console.log(`logonToken: ${this.logonToken}`)
        // step 3: Put the encodedToken to the header section
        
        const header = {
          'Authorization':`Basic ${encodedToken}`
        }
        // step 4: Request login
        axios({
            url:`${url}/user`,
            method:'GET',
            headers:header
          }).then((res)=>{            
            this.$store.commit('updateSession',res.data.key)          
            this.signCard = false;
            this.isLogin=true;
            this.un= '';
            this.pwd='';
          }).catch((err)=>{
            this.errMsg = "Invalid Information"
            console.log(err)
          })
        // check if the logon user is staff.
        const unLastChar = this.un.slice(-1)
        this.isStaff = (unLastChar === "s") ? true : false        
      }
    },
    logout(){
      this.$store.commit('updateSession',null)
      this.isLogin = false
      
    }
  },
  mounted () {
    setInterval(() => {
      const date = new Date()
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }
      this.currentTime = date.toLocaleDateString('en-UK', options)     
    }, 1000)
    fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
      .then(response => response.json())
      .then(data => {
        this.weather = data        
        console.log(this.weather.temperature.data[1])
        this.weatherText = `Temp: ${this.weather.temperature.data[1].value}°C  ` + 
                            `Humidity: ${this.weather.humidity.data[0].value}%`
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>