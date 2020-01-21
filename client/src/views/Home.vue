<template>
  <section id="main">
    <section id="header-text">
      <h1>CS-SKINS.GG</h1>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');
/* #header-text {
  left: 50%
} */
h1 {
  position: relative;
  top: 50%;
  left: 25%;
  transform: translate(0%, 100%);
  color: #ffc107;
  font-size: 10rem;
  font-family: 'Bangers', cursive;
  text-shadow: 5px 5px 5px  #fff;
}
#main {
  margin-top: 5px;
  background-repeat: no-repeat;
  background-position: center;
  overflow-x: hidden;
  width: 100vw;
  height: 91vh;
  background-image: url('../assets/ladningPageBackground.svg');
}
</style>
