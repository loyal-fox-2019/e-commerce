<template>
  <div>
      <navbar></navbar>
      <productlist></productlist>
  </div>
</template>

<script>
import productlist from '../components/productlist'
import navbar from '../components/navbar'
export default {
    name: 'myproducts',
    components:{
        navbar,
        productlist
    }
}
</script>

<style>

</style>