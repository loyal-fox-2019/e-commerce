<template>
   <div id="auth" class="bg-wetasphalt flex justify-center items-center">
      <LoginForm v-if="page == 'login'"/>
      <RegisterForm v-if="page == 'register'"/>
   </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
   name: 'Auth',

   data() {
      return {
         page: this.$route.name
      }
   },

   components: {
      LoginForm,
      RegisterForm
   }
}
</script>

<style scoped>
   #auth {
      height: 100vh;
   }
</style>