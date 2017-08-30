import Vue from 'vue'
import Vuex from 'vuex'
import _  from 'lodash'

Vue.use(Vuex)

import { newPage, fetchPages, fetchPage, savePage, deletePage, fetchRoute } from './api'

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
    },
    actions: {
      async fetchRoute({ state, commit }, { host, path }){
        console.log('fetch route', host + path)
        return await fetchRoute(host, path)
      },

      async deletePage({ state, commit }, { page }) {
        Vue.delete(state.pages, page._id)

        if (page.new)
          commit('addNewPage')
        else
          deletePage(page._id)

          commit('setPageId', state.newId)
      },

      async savePage({ state, commit }) {
        let page = state.pages[state.pageId]
        let data = await savePage(page)
        if (page.new)
          commit('addNewPage')
        return data._id
      },

      async fetchPage({ state, commit }, { id }){
        if (!state.pages || (id && !state.pages[id]))
          state.pages = await fetchPages()

        if (!state.newId)
          commit('addNewPage')

        commit('setPageId', id ? id : state.newId)
      },

      async fetchPages({ state, commit }) {
        state.pages = await fetchPages()
      },
    },
    mutations: {
      setPageId(state, id){
        state.pageId = id
      },
      addNewPage(state) {
        let page = newPage()
        state.newId = page._id
        Vue.set(state.pages, page._id, page)
      },
      setPage(state, page) {
        state.pageId = page._id
        Vue.set(state.pages, state.pageId, page)
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
      cubes: state => state.pages[state.pageId].cubes,
      page: state => state.pages[state.pageId],
      pageState: state => () => state.pages[state.pageId],
      history(state){
        let i = state.pageId
        let h = state.histories
        if (!h[i])
          Vue.set(h, i, { index:-1, stack:[] })
        return h[i]
      },
    }
  })
}
