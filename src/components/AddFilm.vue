<template>
  <q-page>
    <q-bar dark class="bg-primary text-white">
        <div class="col text-center text-weight-bold">
          Search A Film Below:
        </div>
    </q-bar>
    
    <q-form @submit.prevent="search">    
      <div>
        <q-input 
          class="q-mx-auto q-pt-lg q-pb-lg" style="max-width: 330px"
          rounded outlined
          v-model="filmName" 
          label="Please input a Film Name to search"  
          dense>
          
          <template v-slot:before>
            <q-icon name="movie" />
          </template>
  
          <template v-slot:append>
            <q-icon v-if="filmName !== ''" name="close" @click="filmName = ''" class="cursor-pointer" />
            <q-icon name="search"  @click="search()"  />
            <q-ajax-bar :size="2" :color="primary" position ="bottom" />
          </template>            
        </q-input>       
      </div>
    </q-form>
    
    <q-card v-if="film" >
      
      <q-bar dark class="bg-primary text-white">
        <div class="col text-center text-weight-bold">
          Search Result:
        </div>
      </q-bar>      
      
      <q-card-section>
        <div class="text-h3">{{ film.title }}</div>
        <div class="text-subtitle1">{{ film.year }}</div>
      </q-card-section>

      <q-card-section >
        <div class="row q-mx-auto">
          <img :src="film.poster" :alt="film.title" class="q-mr-md"/>
          <div>
            <div><strong>Director:</strong> {{ film.director }}</div>
            <div><strong>Language:</strong> {{ film.language }}</div>
            <div><strong>Genre:</strong> {{ film.genre }}</div>
            <div><strong>Runtime:</strong> {{ film.runtime }} mins</div>
            <div><strong>Released:</strong> {{ film.released }}</div>
          </div>
        </div>
      </q-card-section>

      <q-bar dark class="bg-primary text-white">
        <div class="col text-center text-weight-bold">
          Edit Film Information Below:
        </div>
      </q-bar>      
      
       
          <q-input class="q-mx-auto q-pa-0 " style="max-width: 300px"           
            rounded outlined
            v-model="film.title"
            label = "Title"
            readonly
            dense
          />
          
          <q-input class="q-mx-auto q-pa-0 " style="max-width: 300px"           
            rounded outlined
            v-model="film.poster"
            label = "Poster Link"
            readonly
            dense
          />
          <q-input class="q-mx-auto q-pa-0 " style="max-width: 300px"           
            rounded outlined
            v-model="film.year"
            label = "Year"
            dense
            
            :rules="[val => {
              const year = parseInt(val)
              const currentYear = new Date().getFullYear()
              if (!Number.isInteger(year) || year < 1900 || year > currentYear) {
                return 'Invalid year'
              }
              return true
            }]"
          />         

          <q-input class="q-mx-auto q-pa-0" style="max-width: 300px"   
            rounded outlined
            type="number"
            v-model.number="film.runtime"
            label = "Runtime"
            dense            
        
            :rules = "[val => {
              const runtime = parseInt(val)
              if (!Number.isInteger(runtime) || runtime < 1 || runtime > 999) {
                return 'Runtime must be between 1 - 999'
                }
                return true
            }]"           
          />
        
          <q-input class="q-mx-auto q-pa-0" style="max-width: 300px"   
            rounded outlined
            v-model="film.language"
            label = "Language"
            dense
          />

          <q-input class="q-mx-auto q-pa-0" style="max-width: 300px"   
            rounded outlined
            v-model="film.genre"
            label = "Genre"
            dense
          />

          <q-input class="q-mx-auto q-pa-0" style="max-width: 300px"   
            rounded outlined
            v-model="film.director"
            label = "Director"
            hint = "Press enter to add film record."
            dense
            @keydown.enter="addFilm()"
          >  
            <template v-slot:append>
              <q-icon v-if="filmName !== ''" name="close" @click="filmName = ''" class="cursor-pointer" />
              <q-icon name="playlist_add_circle"  @click="addFilm()"  />
            </template>            
          </q-input>            
              
    </q-card> 

    <q-dialog v-model="filmAdded" >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Great! Film Added.</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
  
        <q-card-section>
          The film was added successfully.
        </q-card-section>
      </q-card>
    </q-dialog>

    
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FilmSearch',
  data () {
    return {
      filmName: '',
      filmAdded: false,
      isLoading: false,
      film: {
        title:'',
        year: '',       
        runtime: '',
        language: '',
        genre: '',
        director: '',
        poster:''
      }
    };
  },
  created() {
    // Set  film Object to null when the component is created
    this.film = null
  },

  methods: {
    search () {
      this.isLoading = true
      axios.get
        (`https://pcpdfilm.starsknights.com:18888/api/v2/ofilm/${this.filmName}`)
        .then((response) => {
          this.film = response.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(()=>{
          this.isLoading = false
        })      
    },
    addFilm() {
      const filmData = JSON.stringify(this.film)
      console.log(filmData)
      axios.post('https://pcpdfilm.starsknights.com:18888/api/v2/film', filmData, {
        headers: {'Content-Type': 'application/json'}})
        .then(response => {
          console.log(response.data); // handle successful response here
          this.filmAdded = true
          this.film = null
          this.filmName = null
        
        })
        .catch(error => {
          console.log(error); // handle error here
        });
    },
  },
};
</script>

