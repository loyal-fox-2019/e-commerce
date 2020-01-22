<template>
  <div>
      <NavBar></NavBar>
      <div class="row px-4 mt-3 mb-4">
          <MyProductList v-for="product in myProducts" :item="product" :key="product._id"></MyProductList>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar'
import MyProductList from '../components/MyProductList'
export default {
    name: 'my-products',
    data(){
        return {
            myProducts: []
        }
    },
    components: {
        NavBar,
        MyProductList
    },
    created(){
        axios({
            method: 'get',
            url: "http://localhost:3000/products/myProducts",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data);
            
            this.myProducts = data
        })
        .catch(err=>{
            console.log(err);
        })
    }

}
</script>

<style>

</style>