<template>
    <div>
  <b-card
    :img-src="productDetails.productImage"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    bg-variant="secondary"
  >
  <h3>{{productDetails.productName}}</h3>
    <b-card-text>
      {{productDetails.price}}
    </b-card-text>

    <router-link :to="{ name: 'ProductDetails', params: {productId: productDetails._id } }"><b-button variant="success">See Product</b-button></router-link>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'ProductCards',
  props: {
    productDetails: {
      type: Object
    }
  }
}
</script>
