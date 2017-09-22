import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { Page, History } from './data/factory'
import { setup } from './api'

export function createStore (context) {
  let api = setup(context.token)
  return new Vuex.Store({
    state: {
      newId: null,
      pageId: null,
      activeCube: null,
      host: null,
      user: null,
      token: null,
      tokenFB: null,
      pages: {},
      cubes: {},
      styles: {},
      histories: {},
      routes: {},
      dark: true,
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

      async updateStyle({ state, commit }, style) {
        return await api.updateStyle(style)
      },

      async addStyle({ state, commit }, style) {
        Vue.set(state.styles, style._id, style)
        return await api.addStyle(style)
      },

      async addStyles({ state, commit }, styles) {
        for (let i in styles){
          if (state.styles[i]) continue
          Vue.set(state.styles, i, styles[i])
          api.addStyle(styles[i])
        }
      },

      async addCubes({ state, commit }, cubes) {
        for (let i in cubes){
          if (state.cubes[i]) continue
          Vue.set(state.cubes, i, cubes[i])
          api.addCube(cubes[i])
        }
      },

      async removeStyle({ state, commit }, style) {
        await api.deleteStyle(style._id)
        Vue.delete(state.styles, style._id)
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

      async fetchPages({ state, commit }) {
        state.pages = await api.fetchPages()
      },

      async fetchBuild({state, commit}, id){
        state.styles = await api.fetchStyles()
        state.pages = await api.fetchPages()
        state.cubes = await api.fetchCubes()
        // build routes & histories
        for (let i in state.pages){
          let p = state.pages[i]
          state.routes[p.url] = i
          let history = History(p, state)
          Vue.set(state.histories, i, history)
        }
        commit('addNewPage')
        commit('setActivePage', id ? id : state.newId)
      },

      async fetchView({state, commit}, { url }){
        if (state.routes[url]) return state.routes[url]
        let { page, styles, cubes } = await api.fetchViewData(url)
        Object.assign(state.styles, styles)
        Object.assign(state.cubes, cubes)
        state.pages[page._id] = page
        state.routes[url] = page._id
        return page._id
      },

      // async fetchView({state, commit}, { url }){
      //   state.styles = await api.fetchStyles()
      //   state.pages = await api.fetchPages()
      //   state.cubes = await api.fetchCubes()
      //   // build routes
      //   for (let i in state.pages){
      //     state.routes[state.pages[i].url] = i
      //   }
      //   return state.routes[url]
      // }
    },
    mutations: {
      setActivePage(state, id){
        state.pageId = id
      },
      addNewPage(state) {
        let page = Page(state.user._id, state.host)
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
      setStyle(state, style) {
        Vue.set(state.styles, style._id, style)
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
    },
    getters: {
      page: state => state.pages[state.pageId],
      linkCount: state => cube => {
        let count = 0
        for (let i in state.pages){
          let p = state.pages[i]
          if (p.blocks[cube._id])
            count+=p.blocks[cube._id]
        }
        return count
      },
      styleCount: state => style => {
        if (!style) return 0
        let count = 0
        for (let i in state.pages){
          let p = state.pages[i]
          if (p.styles[style._id])
            count+=p.styles[style._id]
        }
        return count
      },
    }
  })
}
