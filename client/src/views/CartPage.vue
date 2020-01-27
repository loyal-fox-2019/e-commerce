<template>
      <div>
      <div v-if="carts.length !== 0" class="container">
        <h5 class="my-4 text-center display-4">My Cart</h5>
        <div class="row">
      <div class="col-7">
        <div class="row">
            <div class="col-6"  v-for="cart in carts" :key="cart._id">
                 <ProductCardDetail :product="cart.productId" class="px-4 my-4"></ProductCardDetail>
                  <button type="button" class="btn btn-danger" @click="deleteCart(cart._id)">Delete</button>
                <h4>Amount: {{cart.stock}}</h4>
            </div>
        </div>
      </div>
      <div class="col-5 my-4 text-center">
        <h5 class="my-4">Shopping Details</h5>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{product.name}}</td>
              <td>${{product.price}}</td>
              <td>{{amount[index]}}</td>
              <td>${{amount[index] * product.price}}</td>
            </tr>
          </tbody>
        </table>
        <div class="row mx-2">
              <div class="col-6">
                <p>Select Province :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.province">
                    <option
                      :value="province.province_id"
                      v-for="(province, index) in provinces"
                      :key="index"
                    >{{province.province}}</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <p>Select City :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.city">
                    <option
                      :value="city.city_id"
                      v-for="(city, index) in cities"
                      :key="index"
                    >{{city.city_name}}</option>
                  </select>
                </div>
              </div>
               <div class="col-6">
                <p>Select Courier :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.courier" v-on:change="getTotal">
                    <option
                      :value="courier"
                      v-for="(courier, index) in couriers"
                      :key="index"
                    >{{courier}}</option>
                  </select>
                </div>
               </div>
               <div class="col-6">
                <p>Total Price :</p>
                 <div class>
                  <b>${{total}}</b>
                </div>
               </div>
               <div class="col-12">
                <p>Address :</p>
                <input
                  v-model="delivery.address"
                  class="form-control form-control-sm ml-2"
                  type="text">
              </div>
        </div>
        <br>
        <button type="button" class="btn btn-info" @click="checkout">Checkout Now.. <i class="fas fa-dollar-sign"></i></button>
      </div>
    </div>
    </div>
    <div v-else class="container">
    <div class="row">
      <div class="col-8">
          <img src="https://cdn.dribbble.com/users/486498/screenshots/3491883/shop-.jpg" alt="" srcset="" height="500">
      </div>
      <div class="col-4 text-center mt-5">
        <h5>Your Cart is empty</h5>
        <p>Explore Our Products!</p>
        <button type="button" class="btn btn-outline-dark" @click="goShop"><i class="fas fa-shopping-cart"></i> Shop Now</button>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import ProductCardDetail from "@/components/ProductCardDetail.vue";
import axios from '@/api/server'

export default {
    name:"cart",
    components:{
        ProductCardDetail
    },
    data() {
        return {
            carts:[],
            products:[],
            amount:[],
            provinces:[],
            cities: [],
            couriers: ["jne", "pos", "tiki"],
            delivery: {
              province: "",
              city: "",
              courier: "",
              weight: null,
              address: ""
            },
            cost:"",
            totalPrice:null
        };
    },
    methods:{
        goShop(){
          this.$router.push('/home')
        },
        deleteCart(id){
          axios
            .delete(`/carts/${id}`, {
              headers: { "access-token": localStorage.getItem("token") }
            })
            .then(({data}) => {
              this.generate()
              this.$swal({
                type:'success',
                text: data.message
              })
            })
            .catch((err) => {
               this.$swal({
                type:'success',
                text: err.message
              })
              console.log(err)
            })
        },
        weight(){
          this.delivery.weight = this.amount.length * 100;
        },
        generate(){
            axios
                .get(`/carts`, {
                    headers: { "access-token": localStorage.getItem("token") }
                })
                .then(({ data }) => {
                   console.log(data)
                   this.products = []
                   this.carts = data
                   for(let cart of this.carts){
                       this.totalPrice += ( cart.stock * cart.productId.price)
                       this.amount.push(cart.stock)
                       this.products.push(cart.productId)
                   }
                })
                .catch(err => {
                    console.log(err);
                });
            },
        getTotal(){
          this.weight()
          axios
            .post(
              `/carts/cost`,
            {
                origin: "153",
                destination: this.delivery.city,
                weight: this.delivery.weight,
                courier: this.delivery.courier
            },
            {
              headers: { "access-token": localStorage.getItem("token") }
            }
            )
            .then(({ data }) => {
              this.cost = data;
            })
            .catch(err => {
              console.log(err);
            });
        },
        checkout(){
          const transaction = {
            price:this.total,
            address:this.delivery.address
          }
          axios
            .put(`/carts/checkout`,transaction,{
              headers: { "access-token": localStorage.getItem("token") }
            })
            .then(({data}) => {
              this.$swal({
                type:'success',
                text: data.message
              })
              this.generate()
              this.products = []
              this.delivery.province = ""
              this.delivery.city = ""
              this.delivery.courier = ""
              this.delivery.address = ""
              this.totalPrice = 0
              this.cost = 0
              console.log(data)
            })
            .catch((err) => {
               this.$swal({
                type:'success',
                text: err.message
              })
              console.log(err)
            })
        }
    },
    computed:{
      total(){
        return Math.round((Number(this.cost)/5000) + this.totalPrice)
      } 
    },
    created(){
        this.generate()
        axios
         .get('/carts/province', {
            headers: { "access-token": localStorage.getItem("token") }
          })
         .then(({data}) => {
           this.provinces = data
         })
         .catch((err) => {
           console.log(err)
         })

        axios
          .get(`/carts/city`, {
            headers: { "access-token": localStorage.getItem("token") }
          })
          .then(({ data }) => {
            console.log(data);
            this.cities = data;
          })
          .catch(err => {
            console.log(err);
          });
    }
}
</script>

<style>

</style>
