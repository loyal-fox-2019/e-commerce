<template>
    <b-container fluid class="catHeader">
        <b-row align-v="center" align-h="center" id="hTitle">
            <b-col class="justify-content-center" align-self="center" id="h-col">
              <h1 style="margin-top:3.5%">{{$route.params.category}}</h1>
            </b-col>
        </b-row>
        <b-container>
        <b-row cols="3">
            <b-col class="mt-2" v-for="(categoryProduct, i) in categoryProducts" :key="i">
                <ProductCards :productDetails="categoryProduct"></ProductCards>
            </b-col>
        </b-row>
        </b-container>
    </b-container>
</template>

<script>
import ProductCards from '@/components/ProductCards'
export default {
  name: 'Category',
  components: {
    ProductCards
  },
  props: {
    products: {
      type: Array
    }
  },
  computed: {
    categoryProducts () {
      return this.products.filter(element =>
        element.category.toLowerCase() === this.$route.params.category
      )
    }
  }
}
</script>

<style scoped>
.catHeader {
    height: 100vh;
    width: 100vw;
    color: white;
    padding: 0;
}
#hTitle {
    height: 20vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 48% ;
}
#h-col {
    background-color: rgba(0, 0, 0, 0.5);
    height: 20vh;
}
</style>
