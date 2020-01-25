<template>
  <div>
    <!-- Register Form -->
    <div id="register-form">
      <form>
        <h1>Register</h1>
        <div class="form-group">
          <label for="register-name">Full Name</label>
          <input
            type="text"
            class="form-control text-center"
            id="register-namel"
            v-model="registerData.name"
          />
        </div>
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input
            type="email"
            class="form-control text-center"
            id="register-email"
            aria-describedby="emailHelp"
            v-model="registerData.email"
          />
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input
            type="password"
            class="form-control text-center"
            id="register-password"
            v-model="registerData.password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          @click.prevent="$emit('userRegister', registerData)"
        >
          Register</button
        ><br />
        <h5>
          Already have an account?
          <span @click.prevent="changePage">Login Here</span>
        </h5>
        <g-signin-button
          class="btn btn-primary mt-2"
          id="googleSign"
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Sign in with Google
        </g-signin-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
