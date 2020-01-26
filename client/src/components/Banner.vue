<template>
  <div
    class="jumbotron jumbotron-fluid"
    :style="{ backgroundImage: `url(${bannerName.image})` }"
  >
    <div class="container">
      <h1 class="display-4" style="background: rgba(0,0,0,0.5); padding: 600; font-weight: 600;">{{ bannerName.name }}</h1>
      <p class="lead">
        {{ bannerName.description }}
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
        image: this.$store.state.activePage.image,
        description: 'HEHEHEHEHEHEHEHEHE'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.jumbotron {
  background-size: cover;
  height: 40vh;
  color: white;
}
</style>
