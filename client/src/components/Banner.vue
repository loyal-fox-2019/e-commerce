<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">{{ bannerName.name }}</h1>
      <p class="lead">
          {{bannerName.description}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  computed: {
    bannerName() {
      return {
        name: this.$store.state.activePage.name,
        description: 'HEHEHEHEHEHEHEHEHE'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.jumbotron {
  background: url('../assets/brass1.jpg');
  background-size: cover;
  height: 40vh;
  color: white;
}
</style>
