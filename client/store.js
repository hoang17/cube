// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Assume we have a universal API that returns Promises
import { getGroups } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      groups: {}
    },
    actions: {
      getGroups ({ commit }) {
        // return the Promise via store.dispatch() so that we know
        // when the data has been fetched
        return getGroups().then(groups => {
          commit('setGroups', { groups })
        })
      }
    },
    mutations: {
      setGroups (state, { groups }) {
        state.groups = groups
      }
    }
  })
}
