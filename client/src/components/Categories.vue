<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col cols="6" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/playstation">
          <img
            class="d-block mx-auto src-100"
            src="../assets/playstation.jpg"
          />
          </router-link>
        </div>
      </b-col>
      <b-col cols="6" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/xbox">
          <img
            class="d-block mx-auto src-100"
            src="../assets/xbox.jpg"
          />
          </router-link>
        </div>
      </b-col>
      <b-col cols="7" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/switch">
          <img
            class="d-block mx-auto src-100"
            src="../assets/switch.jpg"
          />
          </router-link>
        </div>
      </b-col>
      <b-col cols="5" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/steam">
          <img
            class="d-block mx-auto src-100"
            src="../assets/steam.jpg"
          />
          </router-link>
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/accessories">
          <img
            class="d-block mx-auto src-100"
            src="../assets/acc.jpg"
          />
          </router-link>
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/custom">
          <img
            class="d-block mx-auto src-100"
            src="../assets/custom.jpg"
          />
          </router-link>
        </div>
      </b-col>
            <b-col cols="4" class="mb-3">
        <div class="img-100">
          <router-link to="/categories/collectibles">
          <img
            class="d-block mx-auto src-100"
            src="../assets/collectibles.jpg"
          />
          </router-link>
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
  box-shadow: 0px 1px 50px 0px rgba(255, 167, 4, 0.75);
}
.src-100:hover {
  transform: scale(1.05);
  transition: 1s;
}
</style>
