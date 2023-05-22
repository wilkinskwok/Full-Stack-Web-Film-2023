<template>
  <q-bar dark class="bg-primary text-white">
        <div class="col text-center text-weight-bold">
          Update your password below:
        </div>
  </q-bar>
    
    <q-form>    
      <div>
        <q-input 
          class="q-mx-auto q-pt-lg q-pb-lg" style="max-width: 330px"
          rounded outlined
          v-model="newPassword" 
          label="Please input your new password"  
          type="password"
          dense>
          
          <template v-slot:before>
            <q-icon name="key" />
          </template>
  
          <template v-slot:append>            
            <q-icon name="save"  @click="updatePW()"  />            
          </template>            
        </q-input>       
      </div>
    </q-form>

 
</template>

<script>
import axios from 'axios'
import url from '../http-common.js'
  
export default {
  data(){
    return {     
      newPassword: ''
    }
  },
  methods:{
    updatePW(){
      const payload = {
        password: this.newPassword,
        valid: 'String',
        lastname: 'String',
        firstname: 'String',
        type: 1,
      };
      const jsonData = JSON.stringify(payload)
      
      const header = {
        //'Authorization': `Basic ${this.$store.getters.getSession}`        
        k: this.$store.getters.getSession
      }
      
      console.log(`URL: ${url}/user`)
      console.log(`New Password: ${jsonData}`)
      console.log(`Headers: ${header.k}`)
      axios({
            url: url,
            method:'PUT',
            headers:header
          })
        .then(response => {
          // Password update successful
          console.log('Password updated successfully');
          console.log(response.data);    
        })
        .catch(error => {
           // Handle the error
          console.error('Error updating password:', error);
        })
      }      
    }
}

</script>