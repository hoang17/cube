import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import App from './App'

// import './index.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}

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
