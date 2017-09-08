import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { Page, History } from './data/factory'
import { fetchPages, fetchPage, addPage, updatePage, deletePage, fetchRoute, addStyle, updateStyle, deleteStyle, fetchStyles } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      newId: null,
      pageId: null,
      pages: null,
      activeCube: null,
      host: null,
      user: null,
      token: null,
      histories: {},
      routes: {},
      styles: {},
    },
    actions: {
      async fetchStyles({ state, commit }) {
        state.styles = await fetchStyles()
      },

      async saveStyle({ state, commit }, style) {
        let data = await updateStyle(style)
      },

      async addStyle({ state, commit }, style) {
        let data = await addStyle(style)
        Vue.set(state.styles, style._id, style)
      },

      async removeStyle({ state, commit }, style) {
        let data = await deleteStyle(style._id)
        Vue.delete(state.styles, style._id)
      },

      async fetchRoute({ state, commit }, { url }){
        return state.routes[url]
        // if (state.routes[url])
        //   return state.routes[url]
        // let id = await fetchRoute(url)
        // if (id)
        //   Vue.set(state.routes, url, id)
        // return id
      },

      async deletePage({ state, commit }, page) {
        Vue.delete(state.pages, page._id)
        Vue.delete(state.histories, page._id)
        commit('setActivePage', state.newId)
        deletePage(page._id)
      },

      async addPage({ state, commit }, page) {
        return await addPage(page)
      },

      async updatePage({ state, commit }, page) {
        return await updatePage(page)
      },

      async fetchPages({ state, commit }) {
        state.pages = await fetchPages()
      },

      async fetchBuild({state, commit}, id){
        state.styles = await fetchStyles()
        state.pages = await fetchPages()
        // build routes & histories
        for (let i in state.pages){
          let p = state.pages[i]
          state.routes[p.url] = i
          Vue.set(state.histories, i, History(p))
        }
        commit('addNewPage')
        commit('setActivePage', id ? id : state.newId)
      },

      async fetchView({state, commit}, { url }){
        state.styles = await fetchStyles()
        state.pages = await fetchPages()
        // build routes
        for (let i in state.pages){
          state.routes[state.pages[i].url] = i
        }
        return state.routes[url]
      }
    },
    mutations: {
      setActivePage(state, id){
        state.pageId = id
      },
      addNewPage(state) {
        let page = Page(state.user._id, state.host)
        state.newId = page._id
        Vue.set(state.pages, page._id, page)
        Vue.set(state.histories, page._id, History(page))
      },
      setPage(state, page) {
        state.pageId = page._id
        Vue.set(state.pages, state.pageId, page)
      },
      setNewPage(state, page){
        state.pageId = page._id
        Vue.set(state.pages, state.pageId, page)
        Vue.set(state.histories, page._id, History(page))
      },
      setCubes(state, cubes) {
        state.pages[state.pageId].cubes = cubes
      },
      setActiveCube(state, cube) {
        state.activeCube = cube
      },
    },
    getters: {
      activeCube: state => state.activeCube,
      pages: state => state.pages,
      page: state => state.pages[state.pageId],
      // histories: state => state.histories,
      // history: state => state.histories[state.pageId],
      // pageState: state => () => state.pages[state.pageId],
      // histories: state => (i) => {
      //   let h = state.histories
      //   if (!h[i])
      //     Vue.set(h, i, { index:-1, stack:[], sid: null })
      //   return h[i]
      // },
      // history: state => {
      //   let i = state.pageId
      //   let h = state.histories
      //   if (!h[i])
      //     Vue.set(h, i, { index:-1, stack:[], sid: null })
      //   return h[i]
      // },
    }
  })
}
