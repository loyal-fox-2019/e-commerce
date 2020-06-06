<template>
  <div class="home">
    <router-view></router-view>
    <NavBar />
    <div class="row">
      <div class="col-8 listCard">
        <Card v-for="product in listProducts" :key="product.id" :product="product" @listCartChild="listCart"/>
      </div>
      <div class="col-4 listCart">
        <ListCart :listCartsItem="listCartsItem" @deleteChildCart="deleteCart" @deleteChildCartMany="deleteCartMany"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import ListCart from '@/components/ListCart.vue'

export default {
  name: 'home',
  data() {
    return {
      listProducts: [],
      listCartsItem: []
    }
  },
  components: {
    NavBar,
    Card,
    ListCart,
  },
  created() {
    if(!localStorage.token) {
       this.$router.push('/login')
    } else {
      this.listData();
      this.listCart();
    }
  },
  methods: {
     listData() {
       axios({
         url: 'http://localhost:3000/products',
         method: 'get',
         headers: { token: localStorage.getItem('token') }
       })
       .then(({ data }) => {
         data.forEach(el => {
           this.listProducts.push(el);
         })
       })
       .catch(err => {
         console.log(err)
       })
     },
     listCart() {
        axios({
            url: 'http://localhost:3000/carts',
            method: 'get',
            headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.listCartsItem = [];
            data.forEach(el => {
              this.listCartsItem.push(el);
            })
        })
        .catch(err => {
            console.log(err)
        })
     },
     deleteCart(value) {
       const id = value;
       axios({
          url: `http://localhost:3000/carts/${id}`,
          method: 'delete',
          headers: { token: localStorage.getItem('token') }
       })
       .then((response) => {
            this.listCart();
       })
        .catch(err => {
          console.log(err)
        })
     },
     deleteCartMany() {
       axios({
          url: `http://localhost:3000/carts`,
          method: 'delete',
          headers: { token: localStorage.getItem('token') }
       })
       .then((response) => {
            this.listCart();
       })
        .catch(err => {
          console.log(err)
        })
     },

  }
}
</script>

<style scoped>
.listCard, .listCart {
  margin-top: 100px;
}

</style>