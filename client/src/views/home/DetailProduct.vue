<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-4 container-image">
        <div class="wrapper-image">
          <img :src="product.image" :alt="product.name" width="350" height="350" class="rounded" />
        </div>
      </div>
      <div class="col-8 container-detail">
        <h1 class="title-product">{{ product.name }}</h1>
        <div style="padding: 20px 0;border-top: 1px solid #E5E7E9;">
          <dt class="d-price">
            <p>
              Harga
            </p>
          </dt>
          <dd class="price">
            <h3>Rp. {{ product.price }}</h3>
          </dd>
        </div>
        <div style="padding: 20px 0;border-top: 1px solid #E5E7E9;">
          <dt class="d-price">
            <p>
              Total
            </p>
          </dt>
          <dd class="total">
            <p>Stock available: {{ product.stock }}!</p>
            <b-input-group
              :prepend="String(total)"
              :append="String(product.stock)"
              size="sm"
              class="mt-3"
            >
              <b-form-input
                type="range"
                min="1"
                :max="product.stock"
                v-model="total"
              ></b-form-input>
            </b-input-group>
          </dd>
        </div>
        <div style="padding: 20px 0;border-top: 1px solid #E5E7E9;">
          <dt class="d-price">
            <p>
              Info
            </p>
          </dt>
          <dd class="total">
            <p>{{ product.description }}</p>
          </dd>
        </div>
        <div style="padding: 20px 0;border-top: 1px solid #E5E7E9;">
          <div class="btn-group btn-group-sm  float-right" role="group" aria-label="btn-buy">
            <button type="button" class="btn btn-secondary">Buy now</button>
            <button type="button" class="btn btn-secondary" @click="addCart">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'DetailProduct',

  data() {
    return {
      total: 1,
    };
  },
  computed: {
    ...mapState('Product', ['product']),
    ...mapState('Cart', ['errors', 'success']),
  },
  methods: {
    ...mapActions('Product', ['getProduct']),
    ...mapActions('Cart', ['createCart']),
    ...mapMutations('Cart', ['SET_ERRORS', 'SET_SUCCESS']),
    addCart() {
      const { isLogin } = this.$store.state;
      if (!isLogin) {
        this.$swal({
          text: 'Please, login or register first!',
          showCloseButton: true,
        });
      } else {
        this.createCart({
          product: this.product._id,
          amount: this.total,
        });
      }
    },
  },
  watch: {
    errors(msg) {
      if (msg) {
        this.$swal({
          title: 'Failed',
          text: msg,
          showCloseButton: true,
        }).then(() => {
          this.SET_ERRORS(null);
        });
      }
    },
    success(data) {
      this.$swal({
        title: 'Success',
        text: data.msg,
        showCloseButton: true,
      }).then(() => {
        this.SET_SUCCESS(null);
      });
    },
  },
  created() {
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style lang="css" scoped>
.container-detail {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100% !important;
  min-width: 0;
  padding: 0 0 0 60px;
  margin-left: 0px;
  border-left: none;
} /*
.container-image {
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  min-width: 0;
  margin-left: 0px;
  border-left: none;
}*/

.title-product {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: Nunito Sans, -apple-system, sans-serif;
  -webkit-text-decoration: initial;
  -webkit-text-decoration: initial;
  text-decoration: initial;
  font-size: 1.25rem;
  line-height: 1.3;
  color: rgba(49, 53, 59, 0.96);
}
.d-price {
  display: inline-block;
  text-transform: uppercase;
  vertical-align: top;
  width: 70px;
}
.d-price p {
  display: block;
  position: relative;
  font-weight: 700;
  font-size: 0.8571428571428571rem;
  line-height: 18px;
  color: rgba(49, 53, 59, 0.44);
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0;
}
.price {
  display: inline-block;
  vertical-align: top;
  width: 624px;
  padding-left: 20px;
  margin: 0;
}
.price h3 {
  margin: 0;
  line-height: 30px;
  font-size: 24px;
}
.total {
  display: inline-block;
  vertical-align: top;
  width: 624px;
  padding-left: 20px;
  margin: 0;
}
.total p {
  display: block;
  position: relative;
  font-weight: 400;
  font-size: 0.8571428571428571rem;
  line-height: 18px;
  color: rgba(49, 53, 59, 0.96);
  -webkit-text-decoration: initial;
  text-decoration: initial;
  margin: 0 0 10px;
  text-align: inherit;
}
</style>
