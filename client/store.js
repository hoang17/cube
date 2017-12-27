import Vue from 'vue'
import Vuex from 'vuex'
import { Page, History } from './data/factory'
import { setup } from './api'
Vue.use(Vuex)

import * as cubes from './data/cubes'
import { clone } from './data/factory'

import uniq from 'lodash/uniq'

export function createStore (context) {
  let api = setup(context.token)
  return new Vuex.Store({
    state: {
      appId: null,
      newId: null,
      pageId: null,
      activeCube: null,
      activeParent: null,
      activeElement: null,
      host: null,
      user: null,
      token: null,
      tokenFB: null,
      pages: {},
      cubes: {},
      histories: {},
      routes: {},
      dark: false,
      recentFonts: [],
    },
    actions: {
      async addCube({ state, commit }, cube) {
        Vue.set(state.cubes, cube._id, cube)
        return await api.addCube(cube)
      },
      async removeCube({ state, commit }, cube) {
        await api.deleteCube(cube._id)
        Vue.delete(state.cubes, cube._id)
      },
      async updateCube({ state, commit }, cube) {
        return await api.updateCube(cube)
      },
      async addCubes({ state, commit }, cubes) {
        for (let i in cubes){
          if (state.cubes[i]) continue
          cubes[i].uid = state.user._id
          Vue.set(state.cubes, i, cubes[i])
          api.addCube(cubes[i])
        }
      },
      async fetchRoute({ state, commit }, { url }){
        return state.routes[url]
      },
      async deletePage({ state, commit }, page) {
        Vue.delete(state.pages, page._id)
        Vue.delete(state.histories, page._id)
        commit('setActivePage', state.newId)
        api.deletePage(page._id)
      },
      async addPage({ state, commit }, page) {
        return await api.addPage(page)
      },
      async updatePage({ state, commit }, page) {
        return await api.updatePage(page)
      },
      async fetchBuild({state, commit, dispatch}, { appId, pageId }){
        state.pages = await api.fetchPages(appId)
        state.cubes = await api.fetchCubes()

        // build routes & histories
        for (let i in state.pages){
          let p = state.pages[i]
          state.routes[p.url] = i
          let history = History(p, state)
          Vue.set(state.histories, i, history)
        }
        state.appId = appId
        commit('addNewPage')
        commit('setActivePage', pageId ? pageId : state.newId)
      },
      async fetchView({state, commit}, { url }){
        if (state.routes[url]) return state.routes[url]
        let { page, cubes } = await api.fetchViewData(url)
        if (!page) return
        state.cubes = Object.assign({}, state.cubes, cubes)
        Vue.set(state.pages, page._id, page)
        state.routes[url] = page._id
        return page._id
      },
      async stripeSubscribe({ state, commit }, plan) {
        return await api.stripeSubscribe(plan)
      },
    },
    mutations: {
      setActivePage(state, id){
        state.pageId = id
      },
      addNewPage(state) {
        let page = Page(state.user._id, state.host, state.appId)
        state.newId = page._id
        Vue.set(state.pages, page._id, page)
        Vue.set(state.histories, page._id, History(page, state))
      },
      setPage(state, page) {
        state.pageId = page._id
        Vue.set(state.pages, state.pageId, page)
      },
      setCube(state, cube) {
        Vue.set(state.cubes, cube._id, cube)
      },
      setNewPage(state, page){
        state.pageId = page._id
        Vue.set(state.pages, state.pageId, page)
        Vue.set(state.histories, page._id, History(page, state))
      },
      setCubes(state, cubes) {
        state.pages[state.pageId].cubes = cubes
      },
      setActiveCube(state, cube) {
        state.activeCube = cube
      },
      setActiveParent(state, cube) {
        state.activeParent = cube
      },
      setActiveElement(state, el) {
        state.activeElement = el
      },
    },
    getters: {
      page: state => state.pages[state.pageId],
      currentFonts: state => {
        let pageFonts = Object.values(state.pages).reduce((acc, page) => {
          return page.fonts ? uniq(acc.concat(Object.keys(page.fonts))) : acc
        }, [])
        return uniq([...state.recentFonts, ...pageFonts]).sort()
      },
      blockCount: state => cube => {
        let count = 0
        for (let i in state.pages){
          let p = state.pages[i]
          if (p.blocks[cube._id])
            count+=p.blocks[cube._id]
        }
        return count
      },
    }
  })
}
