import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {ValidationProvider} from 'vee-validate'
// import VueRouter from "vue-router"
import router from "./router"
// import Register from "./components/Register"
// import Login from "./components/Login"

Vue.component('ValidationProvider', ValidationProvider);
// Vue.use(VueRouter);

// const routes = [
//   { path:'/register',component: Register },
//   { path:'/', component: Login },
// ];

// const router = new VueRouter({
//   routes,
// });

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
