// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'

import { sync } from 'vuex-router-sync'
import infiniteScroll from 'vue-infinite-scroll'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import SocialSharing from 'vue-social-sharing'

import './assets/sedaily.styl'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(SocialSharing)
Vue.use(infiniteScroll)
Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Vuetify, {
  theme: {
    primary: '#3f58af'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
