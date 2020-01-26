<template>
  <div class="card mb-3 p-3 list-product">
    <div class="row">
      <div class="col-md-3">
        <div class="img-product">
          <img :src="item.thumbnail" alt="product" />
        </div>
      </div>
      <div class="col-md">
        <h6 class="mb-0">{{ substringProductName }}</h6>
        <p class="mb-0">
          <small>{{ substringDesc }}</small>
        </p>
        <p class="mb-0">
          <small>
            Price : <b>{{ changeFormatPrice }}</b></small
          >
        </p>
        <p class="mb-3">
          <small
            >Stock : <b>{{ item.stock }}</b></small
          >
        </p>
        <button class="btn btn-info mr-3" @click="$bvModal.show(item._id)">
          Edit Product
        </button>
        <button class="btn btn-danger" @click.prevent="deleteProduct">
          Delete Product
        </button>
      </div>
    </div>

    <!-- Modal -->
    <b-modal :id="item._id" hide-footer>
      <template v-slot:modal-title>
        Edit Product
      </template>
      <div>
        <div class="form-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            class="form-control"
            id="product-name"
            v-model="productName"
          />
        </div>
        <div class="form-group">
          <label for="description">Product Description</label>
          <textarea
            rows="5"
            type="text"
            class="form-control"
            id="description"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-row">
          <div class="col-md mb-3">
            <label for="price">Price</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Rp</span>
              </div>
              <input
                type="number"
                class="form-control"
                id="price"
                required
                autocomplete="off"
                v-model="price"
                @keydown="filterKey"
              />
            </div>
          </div>
          <div class="col-md mb-3">
            <label for="stock">Stock</label>
            <input
              type="Number"
              class="form-control"
              id="stock"
              required
              style="width:80%;"
              v-model="stock"
              @keydown="filterKey"
            />
          </div>
          <button class="btn btn-info btn-edit" @click.prevent="updateProduct">
            Edit Product
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  props: ['item'],
  data() {
    return {
      productName: this.item.productName,
      description: this.item.description,
      price: this.item.price,
      stock: this.item.stock
    }
  },
  computed: {
    changeFormatPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.item.price)
    },
    substringDesc() {
      return this.item.description.substring(0, 130)
    },
    substringProductName() {
      return this.item.productName.substring(0, 85)
    }
  },
  methods: {
    deleteProduct() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          console.log(result)
          if (result.value) {
            axios
              .delete('http://35.185.188.169:3000/products/' + this.item._id, {
                headers: {
                  token: localStorage.getItem('token')
                }
              })
              .then(deleted => {
                Swal.fire('Deleted!', 'Product has been deleted.', 'success')
                this.$store.dispatch('fetchDataProduct')
              })
          }
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    },
    filterKey(e) {
      const key = e.key
      if (key === '.') return e.preventDefault()
      if (key === 'e') return e.preventDefault()
    },
    updateProduct() {
      axios
        .put(
          'http://35.185.188.169:3000/products/' + this.item._id,
          {
            productName: this.productName,
            description: this.description,
            stock: this.stock,
            price: this.price
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: data.message
          })
          this.$bvModal.hide(this.item._id)
          this.$store.dispatch('fetchDataProduct')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    }
  }
}
</script>

<style>
.list-product {
  width: 75%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.img-product {
  width: 100%;
}
.img-product img {
  width: 100%;
  object-fit: contain;
}
.btn-edit {
  width: 100%;
}
</style>
