import Vue from 'vue'
import Vuex from 'vuex'
import _  from 'lodash'

Vue.use(Vuex)

import { fetchPages, fetchPage, savePage, deletePage } from './api'

let newPage = {
  name: 'Page',
  type: 'pg',
  url: '/',
  userId: undefined,
  content: 'New Page 🙌🏻',
  active: false,
  style: {
    color: '',
    display: 'block',
    width: '',
    fontFamily: 'Roboto',
    fontSize: '1em',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0rem',
    textTransform: 'none',
    textAlign: 'center',
    flex: undefined,
    flexFlow: undefined
  },
  cubes: [],
}

let copy = _.cloneDeep(newPage)

export function createStore () {
  return new Vuex.Store({
    state: {
      page: newPage,
      pages: [],
      activeCube: undefined,
      user: undefined,
      token: undefined,
      // history: [],
      // historyIndex: -1,
    },
    actions: {
      async deletePage({ state, commit }, { id }) {
        if (id) {
          Vue.delete(state.pages, id)
          let data = deletePage(id)
        } else {
          newPage = _.cloneDeep(copy)
          commit('setPage', newPage)
        }
      },
      async savePage({ state, commit }) {
        let data = await savePage(state.page)
        if (!state.page._id) {
          newPage = _.cloneDeep(copy)
        }
        state.page._id = data._id
      },
      async fetchPage({ state, commit }, { id }) {
        if (state.pages.length == 0 || (id && !state.pages[id]))
          state.pages = await fetchPages()

        let page = id ? state.pages[id] : newPage
        commit('setPage', page)
        state.activeCube = page
      },
      async fetchPages({ state, commit }) {
        state.pages = await fetchPages()
      },
      // log: function({ state, commit }, { pageState }) {
      //   state.historyIndex++
      //   state.history.splice(state.historyIndex)
      //   state.history.push(_.cloneDeep(pageState))
      // },
      // undo: function({ state, commit }) {
      //   state.historyIndex--
      //   commit('setPage', state.history[state.historyIndex])
      // },
      // redo: function({ state, commit }) {
      //   state.historyIndex += 1
      //   commit('setPage', state.history[state.historyIndex])
      // },
    },
    mutations: {
      setPage(state, page) {
        state.page = page
      },
      setPages(state, pages) {
        state.pages = pages
      },
      setCubes(state, cubes) {
        state.page.cubes = cubes
      },
    },
    getters: {
      page: state => state.page,
      pages: state => state.pages,
      cubes: state => state.page.cubes,
      pageState: state => () => state.page,
    }
  })
}
