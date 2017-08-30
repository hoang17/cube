import Vue from 'vue'
import Vuex from 'vuex'
import _  from 'lodash'

Vue.use(Vuex)

import { newPage, fetchPages, fetchPage, savePage, deletePage } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      newPage: newPage(),
      page: null,
      pages: null,
      activeCube: null,
      user: null,
      token: null,
      histories: {},
    },
    actions: {
      async deletePage({ state, commit }, { page }) {
        Vue.delete(state.pages, page._id)

        if (page.new)
          state.newPage = newPage()
        else
          deletePage(page._id)

        commit('setPage', state.newPage)
      },

      async savePage({ state, commit }) {
        let data = await savePage(state.page)
        if (state.page.new)
          state.newPage = newPage()
        return data._id
      },

      async fetchPage({ state, commit }, { id }){
        if (!state.pages || (id && !state.pages[id]))
          state.pages = await fetchPages()
        let page = id ? state.pages[id] : state.newPage
        commit('setPage', page)
      },

      async fetchPages({ state, commit }) {
        state.pages = await fetchPages()
      },
    },
    mutations: {
      setPage(state, page) {
        state.page = page
        state.pages[state.page._id] = page
      },
      setCubes(state, cubes) {
        state.page.cubes = cubes
      },
      setActiveCube(state, cube) {
        state.activeCube = cube
      },
    },
    getters: {
      activeCube: state => state.activeCube,
      pages: state => state.pages,
      cubes: state => state.page.cubes,
      page: state => state.pages[state.page._id],
      pageState: state => () => state.page,
      history(state){
        let i = state.page._id
        let h = state.histories
        if (!h[i])
          Vue.set(h, i, { index:-1, stack:[] })
        return h[i]
      },
    }
  })
}
