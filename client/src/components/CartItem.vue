<template>
  <div class="mb-3">
    <div class="row px-3 py-4 cart-item shadow">
      <div class="col-md-2">
        <div class="img-wrapper">
          <img :src="product.ProductId.thumbnail" class="img-product" alt />
        </div>
      </div>
      <div class="col-md">
        <h6 class="product-name">{{product.ProductId.productName}}</h6>
        <p class="price">{{changeFormatPrice}}</p>
        <p class="amount">
          <b>{{product.amount}} Pcs</b>
        </p>
        <div class="d-flex justify-content-end">
          <div class="amount-section">
            <i class="fas fa-trash del-item" @click="deleteItem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  props: ['product'],
  computed: {
    changeFormatPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.product.ProductId.price)
    }
  },
  methods: {
    deleteItem() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete('http://localhost:3000/cart/' + this.product._id, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              Swal.fire('Deleted!', data.message, 'success')
              this.$store.dispatch('fetchDataCart')
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.cart-item {
  padding-bottom: 8px!Important;
}
.img-wrapper {
  width: 100%;
}
.img-product {
  width: 100%;
  object-fit: contain;
}
.product-name {
  font-size: 14px;
  margin-bottom: 5px;
}
.price {
  font-size: 14px;
  font-weight: 700;
  color: #e9531c;
  margin-bottom: 0;
}
.amount {
  font-size: 14px;
}
.del-item {
  font-size: 20px;
  color: #b8b8b8;
}
.del-item:hover {
  color: #cf3f0a;
  cursor: pointer;
}
.stock-input {
  padding: 5px;
  background-color: none;
  border: none;
  width: 50px;
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
  font-size: 14px;
}
.stock-input:focus {
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
