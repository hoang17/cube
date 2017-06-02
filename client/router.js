import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('./components/Home')
const Hello = () => import('./components/Hello')
const Items = () => import('./components/Items')
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
      { path: '/api', component: Hello },
      { path: '/contact', component: Hello },
      { path: '/groups/:page(\\d+)?', name: 'Groups', component: Groups },
      { path: '/groups/id/:id', component: Items },
      { path: '/likes/:page(\\d+)?', name: 'Likes', component: Likes },
      { path: '/likes/id/:id', component: Items },
      { path: '/friends/:page(\\d+)?', name: 'Friends', component: Friends },
      { path: '/friends/id/:id', component: Items },
      { path: '/feeds/:page(\\d+)?', name: 'Feeds', component: Feeds }
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition)
        return savedPosition
      if (to.hash)
        return { selector: to.hash }
      return { x: 0, y: 0 }
    }
  })
  // if (process.env.VUE_ENV === 'client'){
  //   router.beforeEach(function (to, from, next) {
  //     window.scrollTo(0, 0)
  //     next()
  //   })
  // }
  return router
}
