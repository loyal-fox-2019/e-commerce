<template>
  <div>
    <!-- Login Form -->
    <div id="login-form">
      <form>
        <h1>Login</h1>
        <div class="form-group">
          <ErrorAlert :errStatus="errStatus" v-show="errCode"></ErrorAlert>
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control text-center"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="loginData.email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control text-center"
            id="exampleInputPassword1"
            v-model="loginData.password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          @click.prevent="$emit('userLogin', loginData)"
        >
          Login
        </button>
        <h5>
          Dont have an account?
          <span @click.prevent="changePage">Register Here</span>
        </h5>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped></style>
