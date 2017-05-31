import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('./components/Home')
const Hello = () => import('./components/Hello')
const Item = () => import('./components/Item')
const Groups = () => import('./components/Groups')
const Likes = () => import('./components/Likes')
const Feeds = () => import('./components/Feeds')
const Friends = () => import('./components/Friends')

export function createRouter () {
  let router = new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'Home', component: Home },
      { path: '/hello', component: Hello },
      { path: '/item/:id', component: Item },
      { path: '/contact', component: Hello },
      { path: '/api', component: Hello },
      { path: '/groups/:page(\\d+)?', name: 'Groups', component: Groups },
      { path: '/likes/:page(\\d+)?', name: 'Likes', component: Likes },
      { path: '/feeds/:page(\\d+)?', name: 'Feeds', component: Feeds },
      { path: '/friends/:page(\\d+)?', name: 'Friends', component: Friends }
    ]
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
