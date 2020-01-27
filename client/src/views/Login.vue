<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container
          fluid
          fill-height
        >
          <v-layout
            align-center
            justify-center
          >
            <v-flex
              xs12
              sm8
              md4
            >
              <login-form v-if="registered" @to-register="registered = false"/>
              <register-form v-if="!registered" @to-login="registered = true"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
export default {
  name: 'LoginPage',
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      registered: true
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>

</style>
