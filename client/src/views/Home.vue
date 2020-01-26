<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="sambutan" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      sambutan: {
        message: 'Hello World'
      }
    }
  },
  components: {
    HelloWorld
  }
}
</script>
