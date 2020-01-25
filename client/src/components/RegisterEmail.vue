<template>
  <b-form @submit.stop.prevent="isEmailUnique" class="text-left mt-2">
    <b-form-group label="Email" label-for="email">
      <b-form-input
        id="email"
        name="email"
        v-model="$v.form.email.$model"
        :state="validateState('email')"
        aria-describedby="email-validator"
      ></b-form-input>

      <b-form-invalid-feedback id="email-validator">
        Format email salah.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-button
      type="submit"
      size="sm"
      :disabled="!validateState('email')"
      :variant="validateState('email') ? 'success' : 'secondary'"
      class="btn-block"
    >
      Lanjutkan pendaftaran
    </b-button>
  </b-form>
  <!-- <div id="input-detail" v-if="$route.params.action == 'detail'"> -->
  <!-- <b-form @submit.stop.prevent="registerAccount" class="text-left mt-2">
        <b-form-group label="Nama Lengkap" label-for="fullname">
          <b-form-input
            id="fullname"
            name="fullname"
            v-model="$v.form.fullname.$model"
            :state="validateState('fullname')"
            aria-describedby="fullname-validator"
          ></b-form-input>

          <b-form-invalid-feedback id="fullname-validator">
            Masukkan nama minimal 3 huruf untuk mendaftar.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            name="username"
            v-model="$v.form.username.$model"
            :state="validateState('username')"
            aria-describedby="username-validator"
          ></b-form-input>

          <b-form-invalid-feedback id="username-validator">
            Masukkan username minimal 3 huruf untuk mendaftar.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            name="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="password-validator"
          ></b-form-input>

          <b-form-invalid-feedback id="password-validator">
            Masukkan nama minimal 3 huruf untuk mendaftar.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Konfirmasi Password" label-for="repeatPassword">
          <b-form-input
            id="repeatPassword"
            name="repeatPassword"
            v-model="$v.form.repeatPassword.$model"
            :state="validateState('repeatPassword')"
            aria-describedby="repeatPassword-validator"
          ></b-form-input>

          <b-form-invalid-feedback id="repeatPassword-validator">
            Masukkan nama minimal 3 huruf untuk mendaftar.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" size="sm" class="btn-block">
          Daftar Akun
        </b-button>
      </b-form> -->
  <!-- </div> -->
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    validateState(input) {
      const { $dirty, $error } = this.$v.form[input];

      return $dirty ? !$error : null;
    },
    isEmailUnique() {
      /* cek jika email unik pake axios
        - klo unik maka ubah form jadi masukkan detail form
        - klo ga unik, tampilkan swal alert jika email sudah terdaftar
       */
      axios({
        method: "GET",
        url: `${this.$baseUrl}/user`,
        params: {
          email: this.form.email
        }
      })
        .then(({ data }) => {
          if (data.length) {
            this.$swal("Alert!", "Email already taken", "error");
            this.form.email = null;
          } else {
            this.$router.push({ name: "register detail" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      alert("Form submitted!");
    }
  },
  watch: {
    $route(to, from) {
      console.log({ to, from });
    }
  }
};
</script>
