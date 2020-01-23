<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
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
              <b-dropdown-item href="#"
                v-if="!$store.state.isAdmin"
                @click.prevent="$bvModal.show('modal-center')">My Cart</b-dropdown-item>
                <!-- CART MODAL -->
                <b-modal id="modal-center" ok-only centered title="My Cart">
                  <div v-if="$store.state.myCart">
                    <div
                      v-show="$store.state.myCart.checkout && !$store.state.myCart.delivered"
                      class="text-center mb-3">
                      <b-button
                        @click="delivered"
                        class="actions-button"
                        variant="outline-primary"
                      >I already received my skins</b-button>
                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in $store.state.myCart.items"
                          :key="i">
                          <th scope="row">{{item.productName}}</th>
                          <td>{{item.qty}}</td>
                          <td>{{getPrice(item.price)}}</td>
                          <td>{{getPrice(item.totalPrice)}}</td>
                        </tr>
                        <!-- <tr>
                          <th scope="row">Total</th>
                          <td>Rp...</td>
                        </tr> -->
                      </tbody>
                    </table>
                    <div class="text-right" id="total">
                      <h4>
                        Total: {{ $store.getters.totalPrice }}
                      </h4>
                    </div>
                    <div class="text-right"
                      v-if="!$store.state.myCart.checkout">
                      <b-button
                        @click="deleteCart"
                        class="actions-button"
                        variant="outline-primary"
                      >Delete cart</b-button>
                      <b-button
                      @click="checkout"
                        class="actions-button"
                        variant="outline-primary"
                      >Checkout</b-button>
                    </div>
                  </div>
                </b-modal>
                <!-- END OF CART MODAL -->
                <b-dropdown-item
                href="#"
                v-if="$store.state.isAdmin"
                @click.prevent="$bvModal.show('modal-transaction')"
                >Show transaction</b-dropdown-item>
                <!-- Transactions modal -->
                <b-modal id="modal-transaction" size="lg"
                  centered
                  scrollable title="Transactions History">
                 <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Customer Id</th>
                          <th scope="col">Total Price</th>
                          <th scope="col">Items</th>
                          <th scope="col">Delivered?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in $store.state.transactions"
                        :key="order._id">
                          <th scope="row">{{order._id}}</th>
                          <td>{{order.customerId}}</td>
                          <td>{{getPrice(order.totalPrice)}}</td>
                          <td>
                            <ul>
                              <li v-for="skin in order.products" :key="skin.productName">
                                {{skin.productName}}
                              </li>
                            </ul>
                          </td>
                          <td>
                            <b-badge v-if="order.delivered"
                            variant="success">DELIVERED!</b-badge>
                             <b-badge v-else
                             variant="warning">ON PROCESS</b-badge>
                          </td>
                        </tr>
                        <!-- <tr>
                          <th scope="row">Total</th>
                          <td>Rp...</td>
                        </tr> -->
                      </tbody>
                    </table>
                </b-modal>
                <!--  -->
              <b-dropdown-item
                href="#"
                :params="params" :logoutButton=true
                @click.prevent="logoutAttempt"
                >Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </section>
          <section v-else>
            <b-button size="sm"
              class="my-2 ml-2 my-sm-0"
              style="background-color: black;"
              variant="dark"
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
                      <b-button style="color: black;" @click="changeForm('SIGN IN')"
                      variant="outline-primary">SIGN IN</b-button>
                      <b-button style="color: black;" @click="changeForm('SIGN UP')"
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
                      style="color: black;"
                      variant="outline-primary"
                      v-show="!buttonClicked"
                      @click="signupAttempt">SUBMIT</b-button>
                    <b-button variant="outline-primary"
                      style="color: black;"
                      v-show="buttonClicked"
                      disabled>
                      <b-spinner small type="grow"></b-spinner>
                      Loading...
                    </b-button>
                  </div>
                  <div class="text-center" v-show="activeForm === 'SIGN IN'">
                    <b-button variant="outline-primary"
                      style="color: black;"
                      v-show="buttonClicked"
                      disabled>
                      <b-spinner small type="grow"></b-spinner>
                      Loading...
                    </b-button>
                    <b-button
                    style="color: black;"
                    v-show="!buttonClicked"
                    variant="outline-primary"
                    @click="signinAttempt">SIGN IN</b-button>
                  </div>
                  <div class="googleLogin mt-2">
                    <GoogleLogin
                      :params="params" :onSuccess="onSuccess"
                      :renderParams="renderParams"
                      :onFailure="onFailure"
                    >Login</GoogleLogin>
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
import GoogleLogin from 'vue-google-login';
import axios from '../config/server';

export default {
  name: 'navbar',
  components: { Password, GoogleLogin },
  data() {
    return {
      buttonClicked: false,
      activeForm: 'SIGN IN',
      fullname: '',
      email: '',
      password: '',
      showError: false,
      errorList: [],
      params: {
        client_id: '175257420107-lodnp8175bne99qbhp5qo0guces8u3vg.apps.googleusercontent.com',
      },
      renderParams: {
        width: 240,
        height: 50,
        theme: 'dark',
        longtitle: true,
      },
    };
  },
  methods: {
    delivered() {
      this.$store.dispatch('delivered', this.$store.state.myCart.customerId);
    },
    checkout() {
      const payload = {
        ...this.$store.state.myCart,
        total: this.$store.getters.getTotal,
      };
      const docs = {
        id: this.$store.state.myCart.customerId,
        payload,
      };
      this.$store.dispatch('checkout', docs);
    },
    deleteCart() {
      this.$store.dispatch('removeCart', this.$store.state.myCart.customerId);
    },
    // minusQty(payload) {
    //   if (payload.qty === 1) {
    //     this.$store.dispatch('removeItem', payload.productId);
    //   } else {
    //     const newQty = {
    //       ...payload,
    //     };
    //     // const { price } = payload;
    //     newQty.qty = -1;
    //     console.log(payload);
    //     // newQty.totalPrice = price;
    //     console.log(newQty);
    //     // this.$store.dispatch('add', newQty);
    //   }
    // },
    showMyCart() {
      this.$bvModal.show('modal-cart');
    },
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
    async onSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token;
      const response = await axios.post('user/google-auth', { idToken });
      const { data } = response;
      const { accessToken, fullname, email } = data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('email', email);
      this.$store.dispatch('checkLogin');
    },
    logoutAttempt() {
      this.email = '';
      this.password = '';
      this.fullname = '';
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
    getPrice(price) {
      const priceToString = price.toString();
      let priceToShow = '';
      let counter = 0;
      for (let i = priceToString.length - 1; i >= 0; i -= 1) {
        if (counter === 2 && i !== 0) {
          priceToShow = `,${priceToString[i]}${priceToShow}`;
          counter = 0;
        } else {
          priceToShow = `${priceToString[i]}${priceToShow}`;
          counter += 1;
        }
      }
      return `Rp ${priceToShow}`;
    },
    getTotal() {
      // const priceToString = this.$store.totalPrice.toString();
      // let priceToShow = '';
      // let counter = 0;
      // for (let i = priceToString.length - 1; i >= 0; i -= 1) {
      //   if (counter === 2 && i !== 0) {
      //     priceToShow = `,${priceToString[i]}${priceToShow}`;
      //     counter = 0;
      //   } else {
      //     priceToShow = `${priceToString[i]}${priceToShow}`;
      //     counter += 1;
      //   }
      // }
      // return `Rp ${priceToShow}`;
    },
  },
  computed: {
    // i don't know why this not work
    // getTotal() {
    //   const priceToString = this.$store.totalPrice.toString();
    //   let priceToShow = '';
    //   let counter = 0;
    //   for (let i = priceToString.length - 1; i >= 0; i -= 1) {
    //     if (counter === 2 && i !== 0) {
    //       priceToShow = `,${priceToString[i]}${priceToShow}`;
    //       counter = 0;
    //     } else {
    //       priceToShow = `${priceToString[i]}${priceToShow}`;
    //       counter += 1;
    //     }
    //   }
    //   return `Rp ${priceToShow}`;
    // },
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
.actions-button {
  margin: 2px;
  /* background-color: black !important; */
  color: black;
}
#total {
  position: relative;
  right: 4%;
}
.googleLogin {
  margin: 0;
  padding: 0;
  position: relative;
  left: 24%;
}
</style>
