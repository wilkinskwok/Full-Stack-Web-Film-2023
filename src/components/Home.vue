<template>
  <q-page>
    <div class="pagination-container">
      <q-pagination        
          v-model="currentPage"
          :total-pages="totalPages"
          @current-change="displayedItems"
          :max="totalPages"
          :max-pages="15"
          :boundary-numbers="true"
          :ellipses="true"
          size="xl"
          direction-links
          boundary-links
          push
          color="teal"
          active-design="push"
          active-color="orange"
      />
    </div>
    
    <div class="row" style="display: flex; flex-wrap: wrap;">
      <div class="col" v-for="item in films" style="flex: 1 0 25%; max-width: 25%;">
        <q-card style="height: 100%;">
          <q-img 
            :src="item.poster" 
            :fit="scale-down"
            style="max-width: 350px; height: 525px;"        
          />
          <q-card-section>
            <div >{{item.title}} </div>
          </q-card-section>   
            <q-card-actions>
                <q-btn color="secondary"  @click="$router.replace(`/d/${item.id}`)">
                  Details                         
                </q-btn>                           
             </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
  
</template>

<script>

import axios from 'axios';
import url from '../http-common.js'
import { ref } from 'vue'
  
export default {
  /*
    setup () {
    return {
      currentPage: ref(1)
    }
  },*/
  data() {
    return {
      films:[], 
      filmsList: [], // Your list of items
      currentPage: 1,
      itemsPerPage: 4, // Number of items to display per page
    };
  },
  created(){
    //get all films from the api
    //the full film list is only be loaded if it is empty
    
    axios.get(`${url}/films`)
    .then((response=>{
      //put the resulted object into an array
      this.filmsList = response.data.map(film => ({
        id: film._id,  
        title: film.title,
        year: film.year,
        released: film.released,
        runtime: film.runtime,
        language: film.language,
        genre: film.genre,
        director: film.director,        
        poster: film.poster,     
      }));
    this.films = this.filmsList.slice(this.currentPage-1, this.itemsPerPage);  
    }))
    .catch((error => {
      console.log(error)
    }))
   
  },  
  computed: {
    totalPages() {
      return Math.ceil(this.filmsList.length / this.itemsPerPage);
    },    
  },
  methods: {
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.films = this.filmsList.slice(startIndex, endIndex);      
    },
  },
  mounted() {
    
  },
  watch: {
    currentPage(newValue, oldValue) {      
      this.displayedItems()
    }
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;  
  margin-top: 10px;  
  margin-bottom: 10px;  
}
</style>
