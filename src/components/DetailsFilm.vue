<template>
  <p> Name: {{film.name}} </p>
  <p> Year: {{film.year}} by: {{film.director}} </p>
  <img :src="film.img" />
  <p> releaes: {{film.release}} </p>
  <p> duration: {{film.duration}} minutes </p>
  <p> genre: {{film.genre}} </p>
  <!-- <q-btn color="secondary" @click="$router.replace('/')"> Back </q-btn>   -->
  <q-btn color="secondary" @click="$router.go(-1)"> Back </q-btn>
</template>


<script>
  import axios from 'axios'
  import url from '../http-common.js'
  export default {
    data(){
      return {
        film:{}
      }
    },
    created(){
      axios.get(`${url}/film/${this.$route.params.id}`)
      .then((response)=>{
        const filmDetail=response.data
        this.film={
          name: filmDetail[0].title,
          year: filmDetail[0].year,
          release: filmDetail[0].released,
          duration: filmDetail[0].runtime,
          genre: filmDetail[0].genre,
          director: filmDetail[0].director,
          img: filmDetail[0].poster
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  
  
</script>