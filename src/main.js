import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { ValidationProvider } from 'vee-validate';
import router from './router'

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
