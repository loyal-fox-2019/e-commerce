<template>
   <form @submit.prevent="loginSubmit" class="flex flex-col py-8 px-6 bg-clouds text-midnightblue text-xl font-semibold rounded-lg">
      <h2 class="border-b border-gray-500 mb-4">Log in</h2>
      <label for="email">Email</label>
      <input type="email" class="bg-clouds border-b border-gray-500 mb-4" required id="email" v-model="email">

      <label for="password">Password</label>
      <input type="password" class="bg-clouds border-b border-gray-500 mb-4" required id="password" v-model="password">

      <input class="cursor-pointer bg-midnightblue text-clouds rounded py-1 hover:text-orange-400" type="submit">
   </form>
</template>

<script>
import axios from '../services/server'

export default {
   name: 'LoginForm',

   data() {
      return {
         email: '',
         password: ''
      }
   },

   methods: {
      async loginSubmit() {
         try {
            const {data} = await axios.post('/login', {
               email: this.email,
               password: this.password
            })
            
            localStorage.token = data.token
            localStorage.userId = data.userId
            localStorage.username = data.username
            localStorage.userType = data.userType

            this.$store.commit('SET_ISLOGGEDIN', true)
            this.$store.commit('SET_USER', {
               email: this.email,
               userType: data.userType
            })

            Swal.fire({
               text: 'Login success'
            })

            this.$router.push({name: 'itemList'})
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   }
}
</script>

<style>

</style>