import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Sites = () => import('./components/Sites')
const Pages = () => import('./views/Pages')
const Canvas = () => import('./components/Canvas')
const Page = () => import('./cubes/Page')

export function createRouter () {
  let router = new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: [
      // { path: '/', redirect: 'groups' },
      { path: '/', name: 'home', component: Page },
      { path: '/site', name: 'pages', component: Pages },
      { path: '/build/:id?', name: 'build', component: Canvas },
      { path: '*', name: 'catch-all',component: Page },
    ],
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition)
    //     return savedPosition
    //   if (to.hash)
    //     return { selector: to.hash }
    //   return { x: 0, y: 0 }
    // }
  })
  // if (process.env.VUE_ENV === 'client'){
  //   router.beforeEach(function (to, from, next) {
  //     window.scrollTo(0, 0)
  //     next()
  //   })
  // }
  return router
}
