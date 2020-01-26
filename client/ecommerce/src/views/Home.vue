<template>
  <div class="home">
    <b-container>
      <br>
        <jumbo></jumbo>
        <br>
        <h1>Category</h1>
        <hr>
        <b-row class="mus">
          <b-col cols='7' class="animated zoomInUp">
            <router-link to="/drum"><img src="../assets/drum.jpg" class="music"></router-link>
          </b-col>
          <b-col cols='5' class="animated zoomInUp">
            <router-link to="/guitar"><img src="../assets/guitar.jpg" alt="" class="music"></router-link>
          </b-col>
        </b-row>
        <b-row class="mus">
          <b-col cols='5' class="animated zoomInUp">
            <router-link to="/mixer"><img src="../assets/mixer.jpg" alt="" class="music"></router-link>
          </b-col>
          <b-col cols='7' class="animated zoomInUp">
            <router-link to="/piano"><img src="../assets/piano.jpg" alt="" class="music"></router-link>
          </b-col>
        </b-row>
   </b-container>
  </div>
</template>

<script>
import jumbo from '../components/jumbotron'

export default {
  name: 'home',
  components: {
    jumbo
  }
}
</script>

<style>
.music{
  width: 100%;
  height: 500px;
}

.music:hover{
  transform: scale(1.1);
  transition: 0.5s
}
.mus{
  margin-top: 25px;
}
</style>
