<template>
  <div>
    <button type="button" class="btn btn-outline-dark mr-3" @click="login">
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
        username: '',
        password: '',
      },
    };
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
      el += '<input type="text" class="form-control mb-2" placeholder="Username"';
      el += 'id="username">';
      el += '<input type="password" class="form-control" placeholder="Password"';
      el += 'id="password">';
      this.$swal({
        title: 'Login?',
        html: el,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancel!',
        preConfirm: () => {
          self.form.username = document.getElementById('username').value;
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

<style lang="css" scoped>
.text-small {
  font-size: 12px;
  line-height: 18px;
}
.text-lighter {
  color: #b9bdc5;
}
</style>
