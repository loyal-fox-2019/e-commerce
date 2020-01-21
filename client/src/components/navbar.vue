<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">CS.SKINS</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/shopping">Start Shopping</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <section v-if="$store.state.isLogin">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <section></section>
              <template v-slot:button-content>
                {{ $store.state.userFullname }}
              </template>
              <b-dropdown-item href="#">My Cart</b-dropdown-item>
              <b-dropdown-item
                href="#"
                @click.prevent="logoutAttempt">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </section>
          <section v-else>
            <b-button size="sm" class="my-2 ml-2 my-sm-0"
              variant="warning"
              v-b-modal.modal-login
              >SIGN IN</b-button>
              <!-- MODAL -->
              <b-modal id="modal-login"
                scrollable
                :ok-title="'Cancel'"
                ok-only centered title="CS.SKINS">
                <section id="modal-mail">
                  <div class="text-center">
                    <b-button-group>
                      <b-button @click="changeForm('SIGN IN')"
                      variant="outline-primary">SIGN IN</b-button>
                      <b-button @click="changeForm('SIGN UP')"
                      variant="outline-primary">SIGN UP</b-button>
                    </b-button-group>
                  </div>
                  <section id="form" @keyup.enter="submit">
                    <h2>{{ activeForm }}</h2>
                    <b-alert show id="warning"
                      dismissible
                      class="pb-0"
                      variant="warning" v-if="showError">
                      <ul>
                        <li v-for="error in errorList" :key="error">{{ error }}</li>
                      </ul>
                    </b-alert>
                    <b-form-input id="input-large"
                      v-model="fullname"
                      class="mb-2 my-form"
                      size="lg"
                      placeholder="Enter your fullname"
                      v-show="activeForm == 'SIGN UP'"
                      ></b-form-input>
                      <b-form-input id="input-large"
                      v-model="email"
                      class="mb-2 my-form"
                      size="lg"
                      placeholder="Enter your email"
                      ></b-form-input>
                      <password
                      v-model="password"
                      :toggle="true"
                      @score="showScore"
                      @feedback="showFeedback"
                    />
                  </section>
                  <div class="text-center" v-show="activeForm === 'SIGN UP'">
                    <b-button
                      variant="outline-primary"
                      v-show="!buttonClicked"
                      @click="signupAttempt">SUBMIT</b-button>
                    <b-button variant="outline-primary"
                      v-show="buttonClicked"
                      disabled>
                      <b-spinner small type="grow"></b-spinner>
                      Loading...
                    </b-button>
                  </div>
                  <div class="text-center" v-show="activeForm === 'SIGN IN'">
                    <b-button variant="outline-primary"
                      v-show="buttonClicked"
                      disabled>
                      <b-spinner small type="grow"></b-spinner>
                      Loading...
                    </b-button>
                    <b-button
                    v-show="!buttonClicked"
                    variant="outline-primary"
                    @click="signinAttempt">SIGN IN</b-button>
                  </div>
                </section>
                </b-modal>
              <!-- END OF MODAL -->
          </section>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter';
import axios from '../config/server';

export default {
  name: 'navbar',
  components: { Password },
  data() {
    return {
      buttonClicked: false,
      activeForm: 'SIGN IN',
      fullname: '',
      email: '',
      password: '',
      showError: false,
      errorList: [],
    };
  },
  methods: {
    submit() {
      if (this.activeForm === 'SIGN IN') {
        this.signinAttempt();
      } else {
        this.signupAttempt();
      }
    },
    changeForm(value) {
      this.showError = false;
      this.errorList = null;
      this.activeForm = value;
    },
    showFeedback({ suggestions, warning }) {
      console.log('🙏', suggestions);
      console.log('⚠', warning);
    },
    showScore(score) {
      console.log('💯', score);
    },
    logoutAttempt() {
      localStorage.clear();
      this.$store.dispatch('checkLogin');
    },
    async signinAttempt() {
      try {
        this.buttonClicked = true;
        const docs = {
          email: this.email,
          password: this.password,
        };
        const response = await axios.post('/user', docs);
        const { data } = response;
        const { fullname, email, token } = data;
        console.log(data);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('fullname', fullname);
        setTimeout(() => {
          this.buttonClicked = false;
          this.$store.dispatch('checkLogin');
        }, 500);
      } catch (err) {
        setTimeout(() => {
          this.showError = true;
          this.errorList = err.response.data.errors;
          this.buttonClicked = false;
        }, 500);
      }
    },
    async signupAttempt() {
      this.buttonClicked = true;
      this.errorList = null;
      this.showError = false;
      const docs = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post('/user/register', docs);
        const { data } = response;
        const { fullname, email, token } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('fullname', fullname);
        setTimeout(() => {
          this.buttonClicked = false;
          this.$store.dispatch('checkLogin');
        }, 500);
      } catch (err) {
        setTimeout(() => {
          this.showError = true;
          this.errorList = err.response.data.errors;
          this.buttonClicked = false;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  text-align: center;
}
.my-form {
  background-color: #f1f1f1;
  border: none;
  width: 21.5em;
  left: 50%;
  transform: translate(-50%, 0%);
  position: relative;
}

</style>
