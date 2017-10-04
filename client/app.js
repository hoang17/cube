import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './plugins/title'
import * as filters from './plugins/filters'
import InfiniteLoading from './addons/InfiniteLoading'
import ClickOutside from './directives/ClickOutside'
import * as cubes from './data/cubes'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.directive('click-outside', ClickOutside)

Vue.component('infinite-loading', InfiniteLoading)

Vue.component('pg-pane', () => import('./panes/PagePane'))
Vue.component('bk-pane', () => import('./panes/BlockPane'))

Vue.component('bk', () => import('./components/Block'))
Vue.component('bv', () => import('./views/BlockView'))

for (let i in cubes) {
  Vue.component(cubes[i].type, () => import(`./cubes/${cubes[i].name}`))
  Vue.component(cubes[i].type+'-pane', () => import(`./panes/${cubes[i].name+'Pane'}`))
}

Vue.config.productionTip = false

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (context) {
  // create store and router instances
  const store = createStore(context)
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
