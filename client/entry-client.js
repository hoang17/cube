// entry-client.js
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'

import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
// Vue.mixin({
//   beforeRouteUpdate (to, from, next) {
//     console.log("@@@@ beforeRouteUpdate")
//     const { asyncData } = this.$options
//     if (asyncData) {
//       asyncData({ store: this.$store, route: to })
//         .then(next)
//         .catch(next)
//     } else {
//       next()
//     }
//   },
//   // beforeMount () {
//   //   console.log("@@@@ beforeMount ", this.$options.name)
//   //   const { asyncData } = this.$options
//   //   if (asyncData) {
//   //     // assign the fetch operation to a promise
//   //     // so that in components we can do `this.dataPromise.then(...)` to
//   //     // perform other tasks after data is ready
//   //     this.dataPromise = asyncData({
//   //       store: this.$store,
//   //       route: this.$route
//   //     })
//   //   }
//   // }
// })

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    // console.log("@@@@ beforeRouteUpdate")
    next()
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {

  console.log("@@@@ onReady")

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  // router.beforeResolve((to, from, next) => {
  //
  //   console.log("@@@@ beforeResolve")
  //
  //   const matched = router.getMatchedComponents(to)
  //   const prevMatched = router.getMatchedComponents(from)
  //   let diffed = false
  //   const activated = matched.filter((c, i) => {
  //     return diffed || (diffed = (prevMatched[i] !== c))
  //   })
  //   if (!activated.length) {
  //     return next()
  //   }
  //   bar.start()
  //   Promise.all(activated.map(c => {
  //     if (c.asyncData) {
  //       return c.asyncData({ store, route: to })
  //     }
  //   })).then(() => {
  //     bar.finish()
  //     next()
  //   }).catch(next)
  // })

  router.beforeResolve((to, from, next) => {
    // console.log("@@@@ beforeResolve")
    next()
  })

  app.$mount('#app')
})

// service worker
// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
// }
