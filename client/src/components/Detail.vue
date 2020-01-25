<template>
  <div class="row">
    <div class="col-md-5">
      <div class="img-area">
        <img
          class="product-img"
          src="https://cf.shopee.co.id/file/3627aa52aaa09e3f30fd40ce985c7a2f"
          alt="product"
        />
      </div>
    </div>
    <div class="col-md-7">
      <div class="product-header mb-2">
        <h4>Speaker Bluetooth Harman/Kardon Aura 2</h4>
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
          <h6 class="price-rp">Rp 769.000</h6>
        </div>
      </div>
      <div class="line-divider"></div>
      <div class="product-total row mb-2">
        <div class="col-md-4 p-3">
          <h6 class="text-muted muted-text">Stock</h6>
        </div>
        <div class="col-md p-3">
          <p class="text-stock">
            <strong>Stock Available : 60</strong>
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
      <div class="product-total row mb-2">
        <div class="col-md-4 p-3">
          <h6 class="text-muted muted-text">Description</h6>
        </div>
        <div class="col-md p-3">
          <p
            class="desc m-0"
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas debitis molestias velit necessitatibus neque consequuntur laudantium, quasi quisquam ut odio. Aliquid incidunt ea laboriosam pariatur quod, dolores eum accusamus quam quos in fugit mollitia officia a quibusdam nulla aperiam sapiente beatae cum alias cumque! Rerum, sed pariatur provident illo adipisci obcaecati officiis autem harum facilis expedita aut unde eum iure sapiente optio, nemo cumque rem tenetur quas? Perferendis natus quibusdam officiis ducimus iusto maxime vel rem molestiae necessitatibus maiores! Tempora!</p>
        </div>
      </div>
      <div class="line-divider mb-3"></div>
      <button class="btn btn-success btn-addcart d-block mx-auto">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0
    }
  },
  methods: {
    increment() {
      this.amount++
    },
    decrement() {
      if (this.amount < 1) {
        this.amount = 0
      } else {
        this.amount--
      }
    }
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
