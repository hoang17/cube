import Vue from 'vue'
import Vuex from 'vuex'
import _  from 'lodash'

Vue.use(Vuex)

import { initNewPage, fetchPages, fetchPage, savePage, deletePage } from './api'

let newPage = initNewPage()

export function createStore () {
  return new Vuex.Store({
    state: {
      page: null,
      pages: null,
      activeCube: null,
      user: null,
      token: null,
      // history: [],
      // historyIndex: -1,
    },
    actions: {
      async deletePage({ state, commit }, { id }) {
        if (id) {
          Vue.delete(state.pages, id)
          let data = deletePage(id)
        } else {
          newPage = initNewPage()
          commit('setPage', newPage)
        }
      },
      async savePage({ state, commit }) {
        let data = await savePage(state.page)
        if (!state.page._id) {
          newPage = initNewPage()
        }
        return data._id
      },
      async fetchPage({ state, commit }, { id }) {
        if (!state.pages || (id && !state.pages[id]))
          state.pages = await fetchPages()

        let page = id ? state.pages[id] : newPage
        commit('setPage', page)
      },
      async fetchPages({ state, commit }) {
        state.pages = await fetchPages()
      },
    },
    mutations: {
      setPage(state, page) {
        state.page = page
        if (page._id)
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
      page: state => state.page._id ? state.pages[state.page._id] : newPage,
      pageState: state => () => state.page,
    }
  })
}
