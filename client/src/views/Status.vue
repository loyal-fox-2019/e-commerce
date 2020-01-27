<template>
  <div class="status">
    <div class="d-flex justify-content-center align-items-center header pt-2 pb-2">
      <router-link to="/" class="back">
        <i class="fas fa-home mr-3"></i>
      </router-link>
      Status Order
    </div>
    <div class="mt-4">
      <b-card class="card container">
      <div><h3><strong>Sending</strong></h3></div>
        <b-card-text>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataCart" :key="item.id">
                <td>{{ item._id }}
                </td>
                <td>{{ item.status }}</td>
                <td>
                  <b-button @click.prevent="received(item)"
                  variant="primary" class="indep op">
                  <i class="fas fa-clipboard-check mr-2"></i>be accepted
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
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataReceivedCart" :key="item.id">
                <td>{{ item._id }}
                </td>
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

export default {
  methods: {
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
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$store.dispatch('fetchSendingCart');
      this.$store.dispatch('fetchReceivedCart');
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');

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
