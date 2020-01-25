import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

library.add(fas);
library.add(fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

Vue.prototype.$baseUrl = "http://localhost:3000";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
