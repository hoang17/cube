// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Assume we have a universal API that returns Promises
import { getGroups, getLikes } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      itemsPerPage: 20,
      groups: {},
      likes: {}
    },
    actions: {
      getGroups ({ state, commit }) {
        if (state.groups.length >0 )
          return Promise.resolve(state.groups)
        // return the Promise via store.dispatch() so that we know
        // when the data has been fetched
        return getGroups().then(groups => {
          commit('setGroups', { groups })
        })
      },
      getLikes ({ state, commit }) {
        if (state.likes.length >0 )
          return Promise.resolve(state.likes)
        // return the Promise via store.dispatch() so that we know
        // when the data has been fetched
        return getLikes().then(likes => {
          commit('setLikes', { likes })
        })
      }
    },
    mutations: {
      setGroups (state, { groups }) {
        state.groups = groups
      },
      setLikes (state, { likes }) {
        state.likes = likes
      }
    },
    getters: {
      // ids of the items that should be currently displayed based on
      // current list type and current pagination
      activeGroups (state) {
        const { itemsPerPage, groups } = state
        const page = Number(state.route.params.page) || 1
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return groups.slice(start, end)
      },

      activeLikes (state) {
        const { itemsPerPage, likes } = state
        const page = Number(state.route.params.page) || 1
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        return likes.slice(start, end)
      },

      // items that should be currently displayed.
      // this Array may not be fully fetched.
      activeItems (state, getters) {
        return getters.activeIds.map(id => state.items[id]).filter(_ => _)
      }
    }
  })
}
