import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Item = () => import('./components/Item')
const Items = () => import('./components/Items')
const Groups = () => import('./components/Groups')
const Likes = () => import('./components/Likes')
const Pages = () => import('./components/Pages')
const NewPost = () => import('./components/NewPost')
const SearchGroup = () => import('./components/SearchGroup')

const Canvas = () => import('./editors/Canvas')
const Page = () => import('./cubes/Page')

export function createRouter () {
  let router = new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: [
      // { path: '/', redirect: 'groups' },
      { path: '/', name: 'canvas', component: Canvas },
      { path: '/build/:id', name: 'build', component: Canvas },
      { path: '/view/:id', name: 'view', component: Page },
      { path: '/groups', name: 'groups', component: Groups },
      { path: '/likes', name: 'likes', component: Likes },
      { path: '/pages', name: 'pages', component: Pages },
      { path: '/i/:id', name: 'item', component: Item },
      { path: '/:type/:id/:page(\\d+)?', name: 'items', component: Items },
      { path: '/:type/:id/new', name: 'new', component: NewPost },
      { path: '/new', name: 'new-post', component: NewPost },
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
