<template>
  <div class="col-4">
    <div class="card mt-3 shadow p-3 mb-3 bg-white rounded" style="width: 20rem;">
      <div class="d-flex justify-content-center">
        <img class="card-img-top gambar" :src="item.productId.file" alt="Card image cap" />
      </div>
      <div class="card-body">
        <h5>{{ item.productId.name }}</h5>
        <div class="desc overflow-auto">
          <p>{{ item.productId.description }}</p>
        </div>
        <div class="row justify-content-center">
          <!-- <h5>{{convertRupiah}}</h5> -->
        </div>
        <div class="d-flex justify-content-around">
          <div class="col-6">
            <h6>Qty: {{item.qty}}</h6>
          </div>
          <div class="col-6">
            <!-- v-on:click="deleteProduct" -->
            <div class="btn btn-danger" v-on:click="deleteFromCart(item._id)">
              <i class="fas fa-lg fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "productInCart",
  props: ["item"],
  data() {
    return {
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    deleteFromCart(id) {
      let url = this.baseUrl;
      axios({
        method: "DELETE",
        url: `${url}/product/cart/myCart/delete/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Your Product has been successfully removed from cart!",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 400px;
  max-height: 400px;
  min-width: 400px;
  min-height: 400px;
}

.gambar {
  max-width: 200px;
  max-height: 150px;
  min-width: 200px;
  min-height: 150px;
}
</style>