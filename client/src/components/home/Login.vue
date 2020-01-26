<template>
  <div>
    <button type="button" class="btn btn-outline-dark mr-1" @click="login">
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    errors() {
      return this.$store.state.errors;
    },
  },
  methods: {
    login() {
      const self = this;
      let el;
      el = '<div class="text-lighter text-center text-small">';
      el += 'Sign in using social network account';
      el += '</div>';
      el += '<button type="button" class="btn btn-light text-dark mb-1">Google</button>';
      el += '<div class="text-lighter text-center text-small">';
      el += 'or use your account';
      el += '</div>';
      el += '<input type="text" class="form-control mb-2" placeholder="Email"';
      el += 'id="email">';
      el += '<input type="password" class="form-control" placeholder="Password"';
      el += 'id="password">';
      this.$swal({
        title: 'Login?',
        html: el,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancel!',
        preConfirm: () => {
          self.form.email = document.getElementById('email').value;
          self.form.password = document.getElementById('password').value;
        },
      }).then((e) => {
        if (e.value) {
          self.$store.dispatch('login', self.form);
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.text-small {
  font-size: 12px;
  line-height: 18px;
}
.text-lighter {
  color: #b9bdc5;
}
</style>
