// import View from './components/view'
// import Link from './components/link'
//
// export let _Vue

export function install (Vue) {

  // 1. add global method or property
  Vue.myGlobalMethod = function () {
    // something logic ...
  }

  Vue.myAddedProperty = 'Example Property'
  
  Vue.myAddedMethod = function() {
    return Vue.myAddedProperty
  }

  // 2. add a global asset
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // something logic ...
  //   }
  //
  // })

  // 3. inject some component options
  Vue.mixin({
    created: function () {
      // something logic ...
    }

  })

  // 4. add an instance property & method
  Vue.prototype.$myMethod = function (methodOptions) {
    // something logic ...
  }

  Vue.prototype.$myAddedProperty = 'Example Property'
  Vue.prototype.$myAddedMethod = function() {
    return Vue.myAddedProperty
  }

  // if (install.installed) return
  // install.installed = true

  // _Vue = Vue

  // const isDef = v => v !== undefined

  // const registerInstance = (vm, callVal) => {
  //   let i = vm.$options._parentVnode
  //   if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
  //     i(vm, callVal)
  //   }
  // }

  // Vue.mixin({
  //   beforeCreate () {
  //     if (isDef(this.$options.router)) {
  //       this._routerRoot = this
  //       this._router = this.$options.router
  //       this._router.init(this)
  //       Vue.util.defineReactive(this, '_route', this._router.history.current)
  //     } else {
  //       this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
  //     }
  //     registerInstance(this, this)
  //   },
  //   destroyed () {
  //     registerInstance(this)
  //   }
  // })

  // Object.defineProperty(Vue.prototype, '$router', {
  //   get () { return this._routerRoot._router }
  // })
  //
  // Object.defineProperty(Vue.prototype, '$route', {
  //   get () { return this._routerRoot._route }
  // })

  // Vue.component('router-view', View)
  // Vue.component('router-link', Link)

  // const strats = Vue.config.optionMergeStrategies
  // // use the same hook merging strategy for route hooks
  // strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
