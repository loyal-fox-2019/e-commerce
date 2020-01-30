<template>
  <div id="app">
    <Nav id="navbar" @changepage="changePage"
    @logout="checkLogin"
    />
    <b-alert show v-if="isError">{{ message }}</b-alert>
    <div id="login" v-if="!isLogged" class="mt-4">
      <h3 class="text-center">Login Admin</h3>
      <b-card class="text-center">
        <b-form-input v-model="email"
        type="email" class="mb-2" placeholder="Enter your email"></b-form-input>
        <b-form-input type="password"
        v-model="password" placeholder="Enter your password"></b-form-input>
        <div class="text-center mt-4">
          <b-button @click="loginAttempt" variant="outline-primary">Login</b-button>
        </div>
      </b-card>
    </div>
    <div id="main" v-else>
      <section id="history" v-show="page === 'history'">
        <h1>TRANSACTION HISTORY</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Total Price</th>
              <th scope="col">Items</th>
              <th scope="col">Delivered?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in list" :key="order._id">
              <th scope="row">{{order._id}}</th>
              <td>{{order.customerId}}</td>
              <td>{{order.totalPrice}}</td>
              <td>
                <ul>
                  <li v-for="skin in order.products"
                  :key="skin.productName">{{skin.productName}}</li>
                </ul>
              </td>
              <td>
                <b-badge v-if="order.delivered" variant="success">DELIVERED!</b-badge>
                <b-badge v-else variant="warning">ON PROCESS</b-badge>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section id="post" v-show="page === 'post'">
        <h1>POST NEW PRODUCT</h1>
        <div class="form-product">
          <h4>Skin detail...</h4>
          <b-card class="text-center">
            Name:
            <b-form-input class="mb-2"
            v-model="name" placeholder="Name"></b-form-input>
            Image:
            <b-form-input class="mb-2"
            v-model="imageurl" placeholder="Image url"></b-form-input>
            Wear:
            <b-form-input class="mb-2"
            v-model="wear" placeholder="wear"></b-form-input>
            Price:
            <b-form-input v-model="price"
            min="0" class="mb-2"
            placeholder="price"></b-form-input>
            Stock:
            <b-form-input v-model="stock"
            min="1" class="mb-2"
            placeholder="stock"></b-form-input>
            <div class="text-center">
              <b-button variant="outline-primary"
              @click="post"
              class="mt-2"
              >POST</b-button>
            </div>
          </b-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';

const BASE_URL = 'http://34.69.229.146';

export default {
  components: {
    Nav,
  },
  data() {
    return {
      isError: false,
      message: 'Something when wrong!',
      isLogged: false,
      page: '',
      email: '',
      password: '',
      list: [],
      name: '',
      stock: 1,
      price: 1,
      imageurl: '',
      wear: '',
    };
  },
  methods: {
    changePage(value) {
      if (value === 'history') {
        this.getHistory();
      }
      this.page = value;
    },
    async post() {
      const payload = {
        name: this.name,
        image: this.imageurl,
        wear: this.wear,
        price: this.price,
        stock: this.stock,
      };
      try {
        await axios({
          method: 'POST',
          url: `${BASE_URL}/products`,
          data: payload,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        this.name = '';
        this.wear = '';
        this.imageurl = '';
        this.stock = 1;
        this.price = 1;
        this.page = 'history';
      } catch (err) {
        this.message = err.response.data.errors.join(',');
        this.isError = true;
      }
    },
    async getHistory() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/transactions`,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        const { data } = response;
        this.list = data;
      } catch (err) {
        this.isError = true;
      }
    },
    async loginAttempt() {
      if (this.email !== 'admin@csskins.com') {
        this.isError = true;
        this.message = 'Only admin can use this page!';
      } else {
        try {
          const payload = {
            email: this.email,
            password: this.password,
          };
          const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/user`,
            data: payload,
          });
          const { data } = response;
          const { fullname, email, token } = data;
          localStorage.setItem('fullname', fullname);
          localStorage.setItem('email', email);
          localStorage.setItem('token', token);
          this.checkLogin();
        } catch (err) {
          this.isError = true;
          const { errors } = err.response.data;
          this.message = errors.join(',');
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        }
      }
    },
    checkLogin() {
      if (!localStorage.getItem('token')) {
        this.isLogged = false;
      } else {
        this.page = 'history';
        this.getHistory();
        this.isLogged = true;
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style scoped>
#login {
  width: 50vw;
  position: relative;
  transform: translateX(-50%);
  left: 50%;
}
.form-product {
  width: 30vw;
  transform: translateX(-50%);
  position: relative;
  left: 50%;
}
</style>
