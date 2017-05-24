// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// import store from './store';
// import VueStash from 'vue-stash'
// Vue.use(VueStash)

export function createApp () {
  // create router instance
  const router = createRouter()
  const store = createStore()

  // sync the router with the vuex store.
  // so that route state is available as part of the store
  // this registers `store.state.route`
  sync(store, router)

  const app = new Vue({
    // inject router into root Vue instance
    // data: { store },
    store,
    router,
    render: h => h(App)
  })

  // return both the app and the router
  return { app, router, store }
}
