<template>
  <div v-if="error">
    <q-banner dense inline-actions class="text-white bg-red">
      You have lost connection to the API.      
    </q-banner>
  </div>
  <div v-if="!error">
    <template v-for="(row) in filmsList">
      <div class="row">
        <template v-for="(item) in row">
          <div class="col-3">
            <q-card >
              <q-img :src="item.poster" />
              <q-card-actions>
                <q-btn color="primary"  @click="$router.replace(`/d/${item.id}`)">
                  {{item.name}}                         
                </q-btn>               
            
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>        
//import films from './films';
import axios from 'axios';
import url from '../http-common.js'

let films =[];
export default{
  data(){
    return{
      error:false,
      filmsList:[]
    }
  },
  created(){
      // call data
     /* for(let i=0;i<films.length;i++){
        const filmObj = {
          name:films[i].title,
          poster:films[i].poster,
          id:films[i]._id
        }
        this.filmsList.push(filmObj);
      }
      console.log(this.filmsList);
    }
  }*/

    let rowItems = [];
    
    
    //call api
    axios.get(`${url}/films`)
    .then((response=>{
      films= response.data
      for(let i=0;i<films.length;i++){        
      const filmObj ={
        name:films[i].title,
        poster:films[i].poster,
        id:films[i]._id
      }            
      rowItems.push(filmObj);
      if (i % 4 === 3 || i === films.length - 1) {
       this.filmsList.push(rowItems);
        rowItems = [];             
      }              
    }
    //console.log(rowItems)
    }))       
  }
}



        
</script>
