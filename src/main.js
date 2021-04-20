import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueMeta from "vue-meta";
import "buefy/dist/buefy.css";

library.add(fas);

Vue.component("faIcon", FontAwesomeIcon);
Vue.use(Buefy, {
  defaultIconComponent: FontAwesomeIcon,
  defaultIconPack: "fas",
});
Vue.use(VueMeta, { refreshOnceOnNavigation: true });

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
