<template>
  <div>
    <div class="d-flex align-items-center justify-content-center mx-1">
      <div class="container">
        <img :src="product.image" alt="Avatar" class="image">
        <div class="middle">
          <a @click.prevent="getDetails(product._id)" href>
                <div class="text">
                    {{product.designer}}
                    <br>
                    Current Stock  {{product.stock}}
                </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsCard",
  props: ["product"],
  methods:{
      getDetails(id){
          this.$router.push(`/products/${id}`)
      }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
}

.image {
  opacity: 1;
  display: block;
  width: 320px;
  height: 270px;
  transition: .5s ease;
  backface-visibility: hidden;
   border-radius: 7%;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}

a { 
  text-decoration: none;  
}
</style>