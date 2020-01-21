<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          name="login"
          prepend-icon="person"
          type="email"
        ></v-text-field>

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <span>
        already have an account? <a @click="toLogin">Login.</a>
      </span>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterForm',
  methods: {
    toLogin () {
      this.$emit('to-login')
    },
    register () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
