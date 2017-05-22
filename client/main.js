import Vue from 'vue'
import VueApp from './App.vue'
import router from './router'

// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<VueApp/>',
  components: { VueApp }
})
