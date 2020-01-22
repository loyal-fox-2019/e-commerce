<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col cols="6" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/playstation.jpg"
          />
        </div>
      </b-col>
      <b-col cols="6" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/xbox.jpg"
          />
        </div>
      </b-col>
      <b-col cols="7" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/switch.png"
          />
        </div>
      </b-col>
      <b-col cols="5" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/steam.jpg"
          />
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/acc.jpg"
          />
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/custom.jpg"
          />
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <img
            class="d-block mx-auto src-100"
            src="../assets/collectibles.jpg"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Categories'
}
</script>

<style scoped>
.img-100 {
  height: 100%;
  width: 100%;
}
.categoriesRow {
  margin-top: 1%;
}
.categoryImages {
  height: 20vh;
}
.src-100 {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
