<template>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#"><router-link :to="`/`">NavBar</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link :to="`/user/products`">My Products</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="`/user/cart`">Cart</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" v-model="searchWord" class="mr-sm-2" placeholder="Search Products"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click.prevent="searchProduct">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" v-on:click.prevent="signOut"><GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from 'axios'
export default {
    name: 'navbar',
    props: ['datas'],
    components:{
      GoogleLogin
    },
    data(){
      return{
        searchWord: '',
        foundProducts: [],
        params: {
          // client_id: process.env.VUE_APP_GOOGLE_ID
        }
      }
    },
    methods:{
      signOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        this.$router.replace('/login')
      },
      searchProduct(){
        axios({
          method: 'get',
          url: 'http://35.240.228.104:3000/product',
          headers:{
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          console.log(data, 'ini data di search prod')
          this.foundProducts=[]
          data.forEach(item=>{
            if(item.name.includes(this.searchWord)){
              this.foundProducts.push(item)
            }
          })
          this.$emit('searched-prod', this.foundProducts)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
}
</script>

<style>

</style>