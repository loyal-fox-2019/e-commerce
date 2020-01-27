<template>
  <b-col class="col-md-12 mt-5">
    <div class="form-wrapper">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          label="Email address:"
        >
          <b-form-input
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Your Name:">
          <b-form-input
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-col>
</template>

<script>
import server from '@/helpers/server'
import Swal from 'sweetalert2'
import router from '../router'

export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      server({
        url: '/login',
        method: 'POST',
        data: this.form
      })
        .then(({ data }) => {
          localStorage.setItem('name', data.name)
          localStorage.setItem('token', data.token)
          this.$store.commit('SET_ISLOGIN', true)
          this.$store.dispatch('FETCH_CART')
          router.push('/')
        })
        .catch(err => {
          Swal.fire(err.response.data.message)
        })
    },
    onReset () {
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>
<style scoped>
  .form-wrapper {
    width: 400px;
    margin: auto;
  }
</style>
