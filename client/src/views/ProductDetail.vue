<template>
  <div class="detail-product">
    <div class="container p-5">
      <Detail></Detail>
    </div>
  </div>
</template>

<script>
import Detail from '../components/Detail'
export default {
  components: {
    Detail
  }
}
</script>

<style>
.detail-product {
  min-height: 94vh;
}
</style>
