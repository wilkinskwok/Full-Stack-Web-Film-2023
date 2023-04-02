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
              <q-card-section>
                <div>{{item.name}}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
  import dummy from './dummy'
  export default {
    data(){
      return {
        error: false,
        filmsList:[]
      }
    },
    created(){
      //call data
      /* for (let i=0; i < dummy.length; i++) {
        const filmObj = {
          name: dummy[i].title,
          poster: dummy[i].poster,
          id:dummy[i]._id
        }
        this.filmsList.push(filmObj)
      } */

      let rowItems = []
      for (let i=0; i<dummy.length; i++){
        const filmObj = {
          name: dummy[i].title,
          poster:dummy[i].poster,
          id:dummy[i]._id
        }
        rowItems.push(filmObj)
        if (i%4==3){
          this.filmsList.push(rowItems)
          rowItems=[]
        }
      }
      console.log(this.filmsList)
    }
  }
</script>
