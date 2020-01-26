<template>
  <div>
    <NavHome />
    <div id="main">
      <router-view />
    </div>
    <FooterHome />
  </div>
</template>
<script>
import NavHome from '@/components/home/NavHome.vue';
import FooterHome from '@/components/home/FooterHome.vue';

export default {
  name: 'Home',
  components: {
    NavHome,
    FooterHome,
  },
  data() {
    return {};
  },
};
</script>

<style>
#main {
  margin-top: 70px;
}
.title-item {
  display: block;
  position: relative;
  font-weight: 800;
  font-family: 'Nunito Sans', -apple-system, sans-serif;
  font-size: 1.7142857142857142rem;
  line-height: 30px;
  color: rgba(49, 53, 59, 0.96);
  -webkit-text-decoration: initial;
  text-decoration: initial;
  font-size: 20px;
  margin: 0;
}
</style>
