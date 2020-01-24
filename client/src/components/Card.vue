<template>
  <div>
    <div class="card " style="width:350px;">
        <img class="card-img-top" :src="product.imgUrl" alt="">
        <div class="card-body">
          <h4 class="card-title">{{product.name}}</h4>
          <p class="card-text">{{product.price}},-</p>
          <p class="card-text">Stock : {{product.quantity}}</p>
          <p class="card-text">Kondisi : {{product.condition}}</p>
          <p class="card-text"><i class="fa fa-store"></i> {{product.seller}}</p>
          <div class="row d-flex justify-content-center">
            <button class="btn btn-dark">Add to cart</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    product : Object
  }
}
</script>

<style>

</style>