import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { Page, History } from './data/factory'
import {
  addPage,
  updatePage,
  deletePage,
  fetchPages,
  fetchPage,
  fetchRoute,
  addStyles,
  addStyle,
  updateStyle,
  deleteStyle,
  fetchStyles,
  addCube,
  updateCube,
  fetchCubes,
  deleteCube,
} from './api'

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
      cubes: {},
      styles: {},
      histories: {},
      routes: {},
      dark: true,
    },
    actions: {
      async addCube({ state, commit }, cube) {
        Vue.set(state.cubes, cube._id, cube)
        return await addCube(cube)
      },

      async removeCube({ state, commit }, cube) {
        await deleteCube(cube._id)
        Vue.delete(state.cubes, cube._id)
      },

      async updateCube({ state, commit }, cube) {
        return await updateCube(cube)
      },

      async updateStyle({ state, commit }, style) {
        return await updateStyle(style)
      },

      async addStyle({ state, commit }, style) {
        Vue.set(state.styles, style._id, style)
        return await addStyle(style)
      },

      async addStyles({ state, commit }, styles) {
        for (let i in styles){
          if (state.styles[i]) continue
          Vue.set(state.styles, i, styles[i])
          addStyle(styles[i])
        }
      },

      async addCubes({ state, commit }, cubes) {
        for (let i in cubes){
          if (state.cubes[i]) continue
          Vue.set(state.cubes, i, cubes[i])
          addCube(cubes[i])
        }
      },

      async removeStyle({ state, commit }, style) {
        await deleteStyle(style._id)
        Vue.delete(state.styles, style._id)
      },

      async fetchRoute({ state, commit }, { url }){
        return state.routes[url]
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
        state.cubes = await fetchCubes()
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
        state.cubes = await fetchCubes()
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
      page: state => state.pages[state.pageId],
    }
  })
}
