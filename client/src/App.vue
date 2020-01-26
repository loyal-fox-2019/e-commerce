<template>
  <div>
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loading from 'vue-loading-overlay'
import Vue from 'vue'

Vue.use(Loading)

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    if (localStorage.getItem('token')) {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      })
      let vm = this
      this.$store.dispatch('check_session', { loader, vm })
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.3;
}
</style>
