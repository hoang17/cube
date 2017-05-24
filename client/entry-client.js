// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
//
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })


// entry-client.js

import { createApp } from './app'

const { app, router } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // bar.start()
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // bar.finish()
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
