<template>
  <div>
    <button type="button" class="btn btn-dark" @click="register">Register</button>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      const self = this;
      let el;
      el = '<div class="text-lighter text-center text-small">';
      el += 'Sign in using social network account';
      el += '</div>';
      el += '<button type="button" class="btn btn-light text-dark mb-1">Google</button>';
      el += '<div class="text-lighter text-center text-small">';
      el += 'or create new account';
      el += '</div>';
      el += '<input type="text" class="form-control mb-2" placeholder="Username"';
      el += 'id="username">';
      el += '<input type="email" class="form-control mb-2" placeholder="Email"';
      el += 'id="email">';
      el += '<input type="password" class="form-control" placeholder="Password"';
      el += 'id="password">';
      this.$swal({
        title: 'Register?',
        html: el,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancel!',
        preConfirm: () => {
          self.form.username = document.getElementById('username').value;
          self.form.email = document.getElementById('email').value;
          self.form.password = document.getElementById('password').value;
        },
      }).then((result) => {
        console.log(self.form);
        console.log(result);
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
