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
        url: `${this.$baseUrl}/users`,
        params: {
          email: this.form.email
        }
      })
        .then(({ data }) => {
          if (data) {
            this.$swal("Alert!", "Email already taken", "error");
            this.form.email = null;
          } else {
            localStorage.email = this.form.email;
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
