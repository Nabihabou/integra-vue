// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GSignInButton from 'vue-google-signin-button'
import vueEventCalendar from 'vue-event-calendar'
import VueEvents from 'vue-events'
import Vuelidate from 'vuelidate'
import VueMq from 'vue-mq'

require('normalize.css');
require('reset-css');

Vue.use(Vuelidate)

Vue.use(VueEvents)

Vue.use(vueEventCalendar, {locale: 'pt-br'}) //locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi'

Vue.use(GSignInButton)

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    mobile: 767,
    desktop: Infinity
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    authData: localStorage.getItem('ls.auth'),
    baseUrl: 'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080',
  }
})
