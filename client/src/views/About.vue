<template>
  <div class="about">
    <NavBar />
    <h1>Toko KITA</h1>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'About',
  components: {
    NavBar,
  }
}
</script>

<style scoped>
.about {
  margin-top: 100px;
}
h1 {
  color: rgb(62, 12, 143);
}
</style>