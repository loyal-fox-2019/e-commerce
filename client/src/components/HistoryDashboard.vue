<template>
  <div class="page">
    <div class="mt-4">
      <b-card class="card container">
      <div><h3><strong>Checkout Order</strong></h3></div>
        <b-card-text>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataCheckoutCart" :key="item.id">
                <td>{{ item._id }}</td>
                <td>{{ item.customer.email }}</td>
                <td>{{ dateFormat(item.updatedAt) }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <b-button @click.prevent="sending(item)"
                  variant="primary" class="indep op">
                 <i class="fas fa-clock mr-2"></i>sending this order
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
    </div>
    <div class="mt-4">
      <b-card class="card container">
      <div><h3><strong>Sending</strong></h3></div>
        <b-card-text>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataCart" :key="item.id">
                <td>{{ item._id }}</td>
                <td>{{ item.customer.email }}</td>
                <td>{{ dateFormat(item.updatedAt) }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <b-button disabled
                  variant="primary" class="indep op">
                 <i class="fas fa-clock mr-2"></i>waiting information from user
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
    </div>
    <div class="mt-4">
      <b-card class="card container">
      <div><h3><strong>Received</strong></h3></div>
        <b-card-text>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataReceivedCart" :key="item.id">
                <td>{{ item._id }}</td>
                <td>{{ item.customer.email }}</td>
                <td>{{ dateFormat(item.updatedAt) }}</td>
                <td>{{ item.status }}</td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'

export default {
  methods: {
    sending(val) {
      this.$store.dispatch('sending', val._id)
        .then(({data}) => {
          swal.fire({
            icon: 'success',
            title: 'Your order is received, We are waiting for your return order',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.dispatch('fetchSendingAllCart');
          this.$store.dispatch('fetchReceivedAllCart');
          this.$store.dispatch('fetchCheckoutAllCart');
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          });
        })
    },
    dateFormat (val) {
      return moment(val).format('MMMM Do YYYY, h:mm:ss a')
    },
    received(item) {
      this.$store.dispatch('received', item._id)
        .then(({data}) => {
          console.log(data.status)
          swal.fire({
            icon: 'success',
            title: 'Your order is received, We are waiting for your return order',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.dispatch('fetchSendingCart');
          this.$store.dispatch('fetchReceivedCart');
        })
        .catch(err => {
          swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            });
        })
    }
  },
  computed: {
    dataCart() {
      return this.$store.state.sending
    },
    dataReceivedCart() {
      return this.$store.state.received
    },
    dataCheckoutCart() {
      return this.$store.state.checkout
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$store.dispatch('fetchSendingAllCart');
      this.$store.dispatch('fetchReceivedAllCart');
      this.$store.dispatch('fetchCheckoutAllCart');
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

  .page {
    height: 98vh;
    overflow: scroll;
  }

  .status {
    font-family: 'Hind Siliguri', sans-serif;
  }

  .back {
    color: #cb9b2d;
    font-weight: bold;
    text-decoration: underline;
  }
  .back:hover {
    color: #927020;
  }

  .op {
    border-radius: 0px !important;
    font-size: 10px
  }

  .indep,
  .indep:focus {
    background-color: #cb9b2d !important;
    border: #cb9b2d !important;
    box-shadow: none !important;
    /* width: 200px; */
    font-weight: bold;
  }
  .indep:hover {
    background-color: #927020 !important;
    border: #927020 !important;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px !important;
    border: none;
    text-align: left;
  }
</style>
