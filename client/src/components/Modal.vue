<template>
  <div>
    <b-modal id="modal-1" title="Login" hide-footer>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary mb-3">
          Login
        </button>
        <h5>
          Dont have an account?
          <span @click.prevent="registerPage">Register Here</span>
        </h5>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalLogin',
  data() {
    return {}
  },
  methods: {
    registerPage() {
      this.$router.push('/register')
      this.$bvModal.hide('modal-1')
    }
  }
}
</script>

<style lang="css" scoped>
span {
  font-weight: 500;
  color: blue;
  cursor: pointer;
}
</style>
