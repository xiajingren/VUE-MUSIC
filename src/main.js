import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import './assets/css/site.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://musicapi.leanapp.cn'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
