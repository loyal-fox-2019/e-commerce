<template>
  <div class="row">
    <div class="col-md-5">
      <div class="img-area">
        <img class="product-img" :src="thumbnail" alt="product" />
      </div>
    </div>
    <div class="col-md-7">
      <div class="product-header mb-2">
        <h4>{{ productName }}</h4>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
        <i class="fa fa-star checked"></i>
      </div>
      <div class="line-divider"></div>
      <div class="product-total row mb-2">
        <div class="col-md-4 p-3">
          <h6 class="text-muted muted-text">Price</h6>
        </div>
        <div class="col-md p-3">
          <h6 class="price-rp">{{ changeFormatPrice }}</h6>
        </div>
      </div>
      <div class="line-divider"></div>
      <div class="product-total row mb-2">
        <div class="col-md-4 p-3">
          <h6 class="text-muted muted-text">Stock</h6>
        </div>
        <div class="col-md p-3">
          <p class="text-stock">
            <strong>Stock Available : {{ stock }}</strong>
          </p>
          <b-button variant="success" pill @click="decrement">
            <i class="fas fa-minus btn-stock"></i>
          </b-button>
          <input type="number" class="stock-input" v-model="amount" />
          <b-button variant="success" pill @click="increment">
            <i class="fas fa-plus btn-stock"></i>
          </b-button>
        </div>
      </div>
      <div class="line-divider"></div>
      <div class="product-total row mb-2 p-3">
        <h6 class="text-muted muted-text">Description</h6>
        <p class="desc m-0">{{ description }}</p>
      </div>
      <div class="line-divider mb-3"></div>
      <button class="btn btn-success btn-addcart d-block mx-auto" @click.prevent="addtoCart">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  computed: {
    changeFormatPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.price)
    }
  },
  data() {
    return {
      amount: 0,
      productName: '',
      description: '',
      thumbnail: '',
      stock: '',
      price: '',
      productId: ''
    }
  },
  methods: {
    increment() {
      if (this.amount === this.stock) {
        this.amount += 0
      } else {
        this.amount++
      }
    },
    decrement() {
      if (this.amount < 1) {
        this.amount = 0
      } else {
        this.amount--
      }
    },
    getData() {
      axios
        .get('http://localhost:3000/products/' + this.$route.params.id)
        .then(({ data }) => {
          this.productName = data.productName
          this.description = data.description
          this.thumbnail = data.thumbnail
          this.stock = data.stock
          this.price = data.price
          this.id = data._id
        })
        .catch(({ response }) => {})
    },
    addtoCart() {
      if (this.amount === 0) {
        Swal.fire({
          icon: 'warning',
          text: 'Amount must be more than 0'
        })
      } else if (this.amount > this.stock) {
        Swal.fire({
          icon: 'warning',
          text: 'Amount exceeds stock'
        })
      } else {
        axios
          .post(
            'http://localhost:3000/cart/',
            {
              amount: this.amount,
              ProductId: this.id
            },
            {
              headers: {
                token: localStorage.getItem('token')
              }
            }
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Added to Cart'
            })
            this.$router.push('/cart')
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              Swal.fire({
                icon: 'error',
                text: 'You Need to Login First'
              })
            } else {
              Swal.fire({
                icon: 'error',
                text: response.data.message
              })
            }
          })
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.img-area {
  width: 100%;
  height: 390px;
  border-radius: 8px;
}
.product-img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.checked {
  color: #f8c222;
  margin-left: 5px;
}
.product-price {
  width: 92%;
}
.product-price h6 {
  margin-bottom: 0;
  font-weight: 700;
}
.line-divider {
  border-bottom: 1px solid #dadada;
}
.price-rp {
  font-size: 24px;
  color: #e9561c;
}
.muted-text {
  font-weight: 600;
}
.text-stock {
  margin-bottom: 15px;
}
.btn-stock {
  font-size: 14px;
}
.stock-input {
  padding: 5px;
  background-color: none;
  border: none;
  width: 70px;
  border-bottom: 1px solid #acacac;
  text-align: center;
}
.stock-input:focus {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btn-addcart {
  background: #e9561c!Important;
  border: none;
  border-radius: 8px;
  width: 80%;
}
.desc {
  text-align: justify;
}
</style>
