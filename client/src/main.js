import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import store from "./store";
import GSignInButton from 'vue-google-signin-button'


Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(GSignInButton)
Vue.$cookies.config('7d')

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, {
    theme: 'snow'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
