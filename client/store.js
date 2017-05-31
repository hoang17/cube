// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { fetch } from './api'

const activeItems =  function(page, itemsPerPage, items){
  page = Number(page) || 1
  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage
  return items.slice(start, end)
}

export function createStore () {
  return new Vuex.Store({
    state: {
      itemsPerPage: 1,
      groups: [],
      likes: [],
      feeds: [],
      friends: []
    },
    actions: {
      getGroups ({ state, commit }) {
        if (state.groups.length >0 )
          return Promise.resolve(state.groups)
        return fetch('groups').then(groups => {
          commit('setGroups', { groups })
        })
      },
      getLikes ({ state, commit }) {
        if (state.likes.length >0 )
          return Promise.resolve(state.likes)
        return fetch('likes').then(likes => {
          commit('setLikes', { likes })
        })
      },
      getFeeds ({ state, commit }) {
        if (state.feeds.length >0 )
          return Promise.resolve(state.feeds)
        return fetch('feeds').then(feeds => {
          commit('setFeeds', { feeds })
        })
      },
      getFriends ({ state, commit }) {
        if (state.friends.length >0 )
          return Promise.resolve(state.friends)
        return fetch('friends').then(friends => {
          commit('setFriends', { friends })
        })
      }
    },
    mutations: {
      setGroups (state, { groups }) {
        state.groups = groups
      },
      setLikes (state, { likes }) {
        state.likes = likes
      },
      setFeeds (state, { feeds }) {
        state.feeds = feeds
      },
      setFriends (state, { friends }) {
        state.friends = friends
      }
    },
    getters: {
      // ids of the items that should be currently displayed based on
      // current list type and current pagination
      activeGroups (state) {
        let page = state.route.params.page
        return activeItems(page, state.itemsPerPage, state.groups)
      },

      activeLikes (state) {
        let page = state.route.params.page
        return activeItems(page, state.itemsPerPage, state.likes)
      },

      activeFeeds (state) {
        let page = state.route.params.page
        return activeItems(page, state.itemsPerPage, state.feeds)
      },

      activeFriends (state) {
        let page = state.route.params.page
        return activeItems(page, state.itemsPerPage, state.friends)
      }

      // items that should be currently displayed.
      // this Array may not be fully fetched.
      // activeItems (state, getters) {
      //   return getters.activeIds.map(id => state.items[id]).filter(_ => _)
      // }
    }
  })
}
