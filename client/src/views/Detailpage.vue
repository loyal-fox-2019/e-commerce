<template>
    <div class="about my-4">
    <h1>{{product.name}}</h1>
    <div class="container my-4">
      <div class="row">
        <div class="col-sm-6">
            <ProductCardDetail :product="product"></ProductCardDetail>
        </div>
        <div class="col-sm-6">
            <div class="card" style="max-height:85%;overflow:scroll;">
                <div class="card-body">
                   {{product.description}} 
                   <br>
                   <b>{{product.designer}}</b>
                </div>
            </div>      
        </div>
        <div class="col-sm-4 offset-4">
            Add Quantity
            <number-input controls :min="min" :max="product.stock" v-model="value"></number-input>
            <br>
            <button type="button" class="btn btn-info" @click="addToCart">Add To Your Cart <i class="fas fa-shopping-cart"></i></button>
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import ProductCardDetail from "@/components/ProductCardDetail.vue";
import axios from '@/api/server'

export default {
    name: "detailsProduct",
    components: {
        ProductCardDetail
    },
    methods:{
        generate() {
            axios
                .get(`/products/${this.$route.params.id}`, {
                    headers: { "access-token": localStorage.getItem("token") }
                })
                .then(({ data }) => {
                    this.product = data;
                    this.product.width = 300
                    this.product.height = 350
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
            },
        addToCart(){
            const product = {
                stock:this.value
            }
            axios
                .post(`/carts/${this.$route.params.id}`, 
                       product, { headers:{'access-token':localStorage.getItem('token')}})
                .then(({ data }) => {
                    console.log(data)
                    this.$swal({
                        type:'success',
                        text:data.message
                    })
                    this.value = null
                    this.$router.push('/home')
                })
                 .catch(err => {
                    this.$swal({
                        type:'error',
                        text: data.message
                    })
                });
        }
    },
    data() {
     return {
        product:null,
        value:null,
        min:1
    };
  },
  created(){
      this.generate()
  }
}
</script>

<style>

</style>
