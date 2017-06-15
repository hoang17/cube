// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { get, fetchItems, fetchUrl } from './api'

const getActiveItems =  function(page, itemsPerPage, items, start = 0){
  page = Number(page) || 1
  const end = page * itemsPerPage
  return items.slice(start, end)
}

function chunk (a, size) {
  let chunks = [], i = 0, p =0, l = a.length
  while (i < l) {
    p++
    let c = a.slice(i, i += size)
    chunks.push({ p, c })
  }
  return chunks
}

export function createStore () {
  return new Vuex.Store({
    state: {
      itemsPerPage: 20,
      groups: [],
      likes: [],
      friends: [],
      feeds: [],
      items: [],
      feedCount: 0,
      gv: null
    },
    actions: {
      async getGroups({ state, commit }) {
        if (state.groups.length > 0) return
        let groups = await get('groups')
        commit('setGroups', groups)
      },
      async getLikes({ state, commit }) {
        if (state.likes.length > 0) return
        let likes = await get('likes')
        commit('setLikes', likes)
      },
      async getFriends({ state, commit }) {
        if (state.friends.length > 0) return
        let friends = await get('friends')
        commit('setFriends', friends)
      },
      async fetchFeeds({ state, commit }, { offsetPage }) {
        const offset = (offsetPage-1) * state.itemsPerPage
        let params = {
          'skip': offset,
          'limit': state.itemsPerPage
        }
        let data = await get('feeds', params)
        commit('setFeedCount', data.count)
        commit('setFeeds', [{ p: offsetPage, c: data.feeds}])
      },
      async fetchMoreFeeds({ state, commit }, { offsetPage }) {
        const offset = (offsetPage-1) * state.itemsPerPage
        let params = {
          'skip': offset,
          'limit': state.itemsPerPage
        }
        let data = await get('feeds', params)
        commit('setFeedCount', data.count)
        commit('addMoreFeeds', { p: offsetPage, c: data.feeds})
      },
      async fetchItems({ state, commit }, {id, offsetPage}) {
        if (!state.gv)
          state.gv = await get('gv')
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'

        const offset = (offsetPage-1) * state.itemsPerPage
        let items = await fetchItems(id, offset, state.itemsPerPage, ver)
        commit('setItems', [{ p: offsetPage, c: items}])
      },
      async fetchMoreItems({ state, commit }, {id, offsetPage}) {
        if (!state.gv)
          state.gv = await get('gv')
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'

        const offset = (offsetPage-1) * state.itemsPerPage
        let items = await fetchItems(id, offset, state.itemsPerPage, ver)
        if (items.length > 0)
          commit('addMoreItems', { p: offsetPage, c: items})
      },
    },
    mutations: {
      setGroups(state, groups) {
        state.groups = groups
      },
      setLikes(state, likes) {
        state.likes = likes
      },
      setFriends(state, friends) {
        state.friends = friends
      },
      setFeeds(state, feeds) {
        state.feeds = feeds
      },
      setItems(state, items) {
        state.items = items
      },
      addMoreItems(state, items) {
        state.items = state.items.concat(items)
      },
      addMoreFeeds(state, feeds) {
        state.feeds = state.feeds.concat(feeds)
      },
      setFeedCount(state, count) {
        state.feedCount = count
      },
    },
    getters: {
      activeGroups: (state) => (page) => {
        return getActiveItems(page, state.itemsPerPage, state.groups)
      },
      activeLikes: (state) => (page) => {
        return getActiveItems(page, state.itemsPerPage, state.likes)
      },
      activeFriends: (state) => (page) => {
        return getActiveItems(page, state.itemsPerPage, state.friends)
      },
      activeFeeds(state) {
        return state.feeds
      },
      activeItems(state) {
        return state.items
      }

      // activeFeeds : (state) => (page, startPage = page) => {
      //   const start = (startPage-1) * state.itemsPerPage
      //   return getActiveItems(page, state.itemsPerPage, state.feeds, start)
      // },

      // activePageFeeds : (state) => (page, startPage = page) => {
      //   const pageItems = chunk(state.feeds, state.itemsPerPage)
      //   return pageItems.slice(startPage-1, page)
      // },


      // items that should be currently displayed.
      // this Array may not be fully fetched.
      // activeItems (state, getters) {
      //   return getters.activeIds.map(id => state.items[id]).filter(_ => _)
      // }
    }
  })
}
