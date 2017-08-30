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
      histories: {},
    },
    actions: {
      async deletePage({ state, commit }, { page }) {
        Vue.delete(state.pages, page._id)

        if (page.new)
          newPage = initNewPage()
        else
          deletePage(page._id)

        commit('setPage', newPage)
      },
      async savePage({ state, commit }) {
        let data = await savePage(state.page)
        return data._id
      },
      async fetchPageToEdit({ state, commit }, { id }){
        // fetch pages & init histories
        if (!state.pages || (id && !state.pages[id])){
          state.pages = await fetchPages()

          // init histories
          for (let i in state.pages){
            if (!state.histories[i])
              state.histories[i] = { index:-1, stack:[] }
          }
          if (!state.histories[id])
            state.histories[id] = { index:-1, stack:[] }
        }

        let page = id ? state.pages[id] : newPage
        commit('setPage', page)
      },
      async fetchPageToView({ state, commit }, { id }) {
        // fetch pages
        if (!state.pages || !state.pages[id])
          state.pages = await fetchPages()
        if (state.pages[id])
          commit('setPage', state.pages[id])
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
      page: state => state.page._id ? state.pages[state.page._id] : newPage,
      pageState: state => () => state.page,
    }
  })
}
