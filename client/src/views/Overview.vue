<template>
    <div class="container my-2 text-center">
    <h1> Products Overview</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Product</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{product.name}}</td>
          <td>{{product.description}}</td>
          <td>
              <a @click.prevent="getUpdate(product._id)" href><i class="fas fa-pen"></i></a> |
              <a @click.prevent="getDelete(product._id)" href="#"><i class="fas fa-trash"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "@/api/server";

export default {
    computed:{
        ...mapState(['products'])
    },
    methods:{
        getDelete(id){
            axios
                .delete(`/products/${id}`,{
                    headers:{'access-token':localStorage.getItem('token')}
                })
                .then(({data}) => {
                    console.log(data)
                    this.$store.dispatch('getAllProducts') 
                    this.$swal({
                        type: `success`,
                        title: 'success deleted the product'
                    })    
                })
                .catch((err) => {
                    console.log(err)
                    this.$swal({
                        type:'error',
                        title: "Failed to Delete",
                    })
                })
        },
        getUpdate(id){
            this.$router.push(`/admin/editProduct/${id}`)
        }
    },
    created(){
        this.$store.dispatch('getAllProducts')
    }
}
</script>

<style>

</style>
