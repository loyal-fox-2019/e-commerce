<template>
  <div class="card mt-4 mb-4">
      <div class="card-body" v-on:mouseover="showCardContent = true" v-on:mouseleave="showCardContent = false">
          	<img v-bind:src="product.productImage" 
              style="width:100%;" alt="Alneato" class="img-responsive card-img-top"/>
              <div v-if="showCardContent" class="card-content" v-animate-css="'fadeIn'">
                  <h4>{{product.brand}}</h4>
                  <h6>{{product.type}}</h6>
              </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'iteamCard',
    props: ['product'],
    data() {
        return {
            showCardContent: false
        }
    }
}
</script>

<style scoped>
.card {
    border: none;
    position: relative;
}

.card:hover {
    box-shadow: 0px 0px 5px black;
}
.card-content {
    padding: 10px 0 2px 0;
    width: 100%;
    background-color: rgba(192,192,192, 0.5);
    text-align: center;
    position: absolute;
    right: 0px;
    bottom: 0px;
}

.card-content h4 {
     color: black;
     font-weight: 500;
}
</style>