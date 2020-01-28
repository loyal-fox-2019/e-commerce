<template>
  <div>
    <b-form @submit.stop.prevent="registerAccount" class="text-left mt-2">
      <b-form-group label="Nama Lengkap" label-for="fullname">
        <b-form-input
          id="fullname"
          name="fullname"
          v-model="$v.form.fullname.$model"
          :state="validateState('fullname')"
          aria-describedby="fullname-validator"
        ></b-form-input>

        <b-form-invalid-feedback id="fullname-validator">
          Masukkan nama lengkap minimal 3 huruf untuk mendaftar.
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
        <b-input-group>
          <b-form-input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="password-validator"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button
              variant="light"
              size="sm"
              @click.prevent="showPassword = !showPassword"
            >
              <font-awesome-icon
                :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
              />
            </b-button>
          </b-input-group-append>

          <b-form-invalid-feedback id="password-validator">
            <div>
              Password minimal 6 karakter yang merupakan kombinasi huruf kecil,
              huruf besar, angka, dan tanda baca.
            </div>
            <div>
              Contoh: Ju@l4n-Ay4m
            </div>
          </b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Konfirmasi Password" label-for="repeatPassword">
        <b-form-input
          :type="showPassword ? 'text' : 'password'"
          id="repeatPassword"
          name="repeatPassword"
          v-model="$v.form.repeatPassword.$model"
          :state="validateState('repeatPassword')"
          aria-describedby="repeatPassword-validator"
        ></b-form-input>

        <b-form-invalid-feedback id="repeatPassword-validator">
          Password harus sama.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        size="sm"
        :disabled="validateAll()"
        :variant="validateAll() ? 'secondary' : 'success'"
        class="btn-block"
      >
        Daftar
      </b-button>
    </b-form>
    <!-- </div> -->
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, helpers, sameAs, minLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],
  data() {
    return {
      showPassword: false,
      form: {
        fullname: "",
        username: "",
        password: "",
        repeatPassword: ""
      }
    };
  },
  validations: {
    form: {
      fullname: {
        required,
        minLength: minLength(3)
      },
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(6),
        strongPassword: helpers.regex(
          "password",
          new RegExp(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g
          )
        )
      },
      repeatPassword: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    validateState(input) {
      const { $dirty, $error } = this.$v.form[input];

      return $dirty ? !$error : null;
    },
    validateAll() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return true;
      } else {
        return false;
      }
    },
    registerAccount() {
      axios({
        method: "POST",
        url: `${this.$baseUrl}/users/register`,
        data: { ...this.form, email: localStorage.email }
      })
        .then(({ data }) => {
          localStorage.removeItem("email");
          localStorage.setItem("name", data.fullname);
          localStorage.setItem("token", data.token);
          this.$swal("Success!", "Registration Success", "success");
          this.$router.push({ name: "show products" });
        })
        .catch(err => {
          console.log(err);

          this.$swal("Error!", "Something went wrong", "error");
          this.$router.push({ name: "show products" });
        });
    }
  }
};
</script>
