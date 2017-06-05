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
      { path: '/', name: 'home', component: Home },
      { path: '/hello', component: Hello },
      { path: '/api', component: Hello },
      { path: '/contact', component: Hello },
      { path: '/groups/:page(\\d+)?', name: 'groups', component: Groups },
      { path: '/likes/:page(\\d+)?', name: 'likes', component: Likes },
      { path: '/friends/:page(\\d+)?', name: 'friends', component: Friends },
      { path: '/feeds/:page(\\d+)?', name: 'feeds', component: Feeds },
      { path: '/:type/id/:id/:page(\\d+)?', name: 'items', component: Items }
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition)
        return savedPosition
      if (to.hash)
        return { selector: to.hash }
      // return { x: 0, y: 0 }
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
