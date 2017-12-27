import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Canvas = () => import('./components/Canvas')
const Page = () => import('./components/Page')
const Lab = () => import('./lab/Lab')
const JSS = () => import('./css-js/JSS')
const Emotion = () => import('./css-js/Emotion')
const Glamor = () => import('./css-js/Glamor')
const ASS = () => import('./css-js/ASS')
const CXS = () => import('./css-js/CXS')
const Stylish = () => import('./css-js/Stylish.vue')

export function createRouter () {
  let router = new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: [
      // { path: '/', redirect: 'groups' },
      { path: '/', name: 'home', component: Page },
      { path: '/build/:appId/:id?', name: 'build', component: Canvas },
      { path: '/lab', name: 'lab', component: Lab },
      { path: '/jss', name: 'jss', component: JSS },
      { path: '/emotion', name: 'emotion', component: Emotion },
      { path: '/glamor', name: 'glamor', component: Glamor },
      { path: '/ass', name: 'ass', component: ASS },
      { path: '/cxs', name: 'cxs', component: CXS },
      { path: '/stylish', name: 'stylish', component: Stylish },
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
