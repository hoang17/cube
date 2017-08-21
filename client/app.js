import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import InfiniteLoading from './addons/InfiniteLoading'
import Vuetify from 'vuetify'
import ClickOutside from './directives/ClickOutside'

Vue.use(Vuetify)

Vue.directive('click-outside', ClickOutside)

Vue.component('infinite-loading', InfiniteLoading)

// Vue.component('tx', () => import('./cubes/Text'))

var com = [
  { name: 'Text', tag: 'tx' },
  { name: 'Button', tag: 'btn' },
  { name: 'LinkText', tag: 'link-text' },
  { name: 'Photo', tag: 'photo' },
  { name: 'Icon', tag: 'icon' },
  { name: 'DataTable', tag: 'data-table' },
  { name: 'DataForm', tag: 'data-form' },
  { name: 'Timer', tag: 'timer' },
  { name: 'Container', tag: 'container' },
  { name: 'VideoBox', tag: 'video-box' },
  { name: 'AudioBox', tag: 'audio-box' },
  { name: 'Card', tag: 'card' },
  { name: 'List', tag: 'list' },
  { name: 'Grid', tag: 'grid' },
  { name: 'Popup', tag: 'popup' },
  { name: 'Toolbar', tag: 'toolbar' },
  { name: 'Gallery', tag: 'gallery' },
  { name: 'ContactForm', tag: 'contact-form' },
  { name: 'SocialShare', tag: 'social-share' },
]

for (let i in com) {
  Vue.component(com[i].tag, () => import(`./cubes/${com[i].name}`))
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
export function createApp () {
  // create store and router instances
  const store = createStore()
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
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
