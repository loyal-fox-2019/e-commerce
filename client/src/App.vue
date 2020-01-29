<template>
   <div id="appbody" class="">
      <div id="navbar" class="flex justify-between py-3 items-center px-16 text-2xl border-b-4 border-black text-clouds bg-midnightblue">
         <router-link to="/">Gameshoope</router-link>
         <div v-if="!isLoggedIn" class="flex">
            <router-link class="px-3 hover:text-orange-400 hover:bg-gray-900 rounded-lg" :to="{name: 'login'}">Log in</router-link>
            <router-link class="px-3 hover:text-orange-400 hover:bg-gray-900 rounded-lg" :to="{name: 'register'}">Register</router-link>
         </div>
         <div v-if="isLoggedIn">
            <router-link class="px-3 hover:text-orange-400 hover:bg-gray-900 rounded-lg" to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
            <router-link class="px-3 hover:text-orange-400 hover:bg-gray-900 rounded-lg" to="/transaction">{{username}}'s Transaction</router-link>
            <a href="" @click.prevent="logout">Log out</a>
         </div>
      </div>
      <router-view :key="$route.fullPath" class="bg-wetasphalt min-h-screen" @emitFetchUser="fetchUser"></router-view>
   </div>
</template>

<script>
import axios from './services/server'
export default {
   name: 'App',

   data() {
      return {
         usernameDisplay: this.username
      }
   },

   methods: {
      async fetchUser() {
         console.log('fetching user')
         try {
            if(this.$store.state.isLoggedIn) {
               console.log('start fetching')
               const {data} = await axios.get('/user', {
                  token: localStorage.token
               })

               this.$store.commit('SET_USER', data.user)
               console.log('isi user', this.$store.state.user)
            }
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      },

      logout() {
         localStorage.removeItem('userId')
         localStorage.removeItem('token')
         localStorage.removeItem('username')
         localStorage.removeItem('userType')

         this.$store.commit('SET_ISLOGGEDIN', false)
         this.$store.commit('SET_USER', null)
         
         this.$router.push({name: 'itemList'})
            .catch(err => {})
      }
   },
   
   created() {
      if(this.$store.state.user === null) {
         console.log('isi user', this.$store.state.user)
         this.fetchUser()
         
      }
   },

   computed: {
      isLoggedIn: function() {
         return this.$store.state.isLoggedIn
      },

      username: function() {
         let username = ''
         if(this.$store.state.user) username = this.$store.state.user.email.split('@')[0]
         return username
      }
   },

   watch: {
      username: function(newVal, oldVal) {
         console.log(newVal)
         if(newVal) this.usernameDisplay = username
      },

      $route: function(to, from) {
         const adminWhitelist = [
            'adminHome'
         ]
         
         if(localStorage.userType && localStorage.userType == 'admin' && !adminWhitelist.includes(to.name)) {
            this.$router.push({name: 'adminHome'})
         }
      }
   }
}
</script>

<style>
   .bg-carrot {
      background-color: #e67e22;
   }

   .text-carrot {
      color: #e67e22;
   }

   .bg-wetasphalt {
      background-color: #34495e;
   }

   .text-wetasphalt {
      color: #34495e;
   }

   .bg-midnightblue {
      background-color: #2c3e50;
   }

   .text-midnightblue {
      color: #2c3e50;
   }

   /* #navbar {
      background-color: #2c3e50;
   } */

   .bg-clouds {
      background-color: #ECF0F1;
   }

   .text-clouds {
      color: #ECF0F1;
   }

   .bg-silver {
      background-color: #BDC3C7;
   }

   .text-silver {
      color: #BDC3C7;
   }
</style>