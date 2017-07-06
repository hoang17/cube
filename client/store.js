// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { get, fetch, fetchItems, patch } from './api'

const _ = require('lodash')

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

function groupVersions(groups){
  return _.fromPairs(_.map(groups, i => [i.id, i.ver]))
}

export function createStore () {
  return new Vuex.Store({
    state: {
      itemsPerPage: 20,
      groups: [],
      likes: [],
      pages: [],
      feeds: {},
      items: {},
      feedCount: 0,
      gv: null
    },
    actions: {
      async getGroups({ state, commit }) {
        if (state.groups.length > 0) return
        let groups = await fetch('v2.3/me/groups')
        commit('setGroups', groups)
        state.gv = groupVersions(groups)
      },
      async getLikes({ state, commit }) {
        if (state.likes.length > 0) return
        let likes = await fetch('v2.6/me/likes?fields=id,name,category,about,description,phone,single_line_address,created_time,fan_count,rating_count,talking_about_count')
        commit('setLikes', likes)
      },
      async getPages({ state, commit }) {
        if (state.pages.length > 0) return
        let pages = await fetch('v2.6/me/accounts?fields=id,name,category,about,description,phone,single_line_address,created_time,fan_count,rating_count,talking_about_count')
        commit('setPages', pages)
      },
      async fetchFeeds({ state, commit }, { page }) {
        const offset = (page-1) * state.itemsPerPage
        let params = {
          'skip': offset,
          'limit': state.itemsPerPage
        }
        let data = await get('feeds', params)
        commit('setFeedCount', data.count)
        commit('setFeeds', { page, feeds: data.feeds})
      },
      async fetchMoreFeeds({ state, commit }, { page }) {
        const offset = (page-1) * state.itemsPerPage
        let params = {
          'skip': offset,
          'limit': state.itemsPerPage
        }
        let data = await get('feeds', params)
        commit('setFeedCount', data.count)
        commit('addMoreFeeds', { page, feeds: data.feeds})
      },
      async fetchItems({ state, commit }, {id, page}) {
        if (!state.gv){
          let groups = await get('groups')
          commit('setGroups', groups)
          state.gv = groupVersions(groups)
        }
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'

        const offset = (page-1) * state.itemsPerPage

        let items = await fetchItems(id, offset, state.itemsPerPage, ver)
        commit('setItems', { page, items })
      },
      async fetchMoreItems({ state, commit }, {id, page}) {
        if (!state.gv){
          let groups = await get('groups')
          commit('setGroups', groups)
          state.gv = groupVersions(groups)
        }
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'

        const offset = (page-1) * state.itemsPerPage

        let items = await fetchItems(id, offset, state.itemsPerPage, ver)
        if (items.length > 0)
          commit('addMoreItems', { page, items })
      },
    },
    mutations: {
      setStar(state, {item, type}) {
        patch(`${type}/${item.id}`, { star: item.star })
      },
      setGroups(state, groups) {
        state.groups = groups
      },
      setLikes(state, likes) {
        state.likes = likes
      },
      setPages(state, pages) {
        state.pages = pages
      },
      setFeeds(state, {page, feeds}) {
        state.feeds = {}
        Vue.set(state.feeds, page, feeds)
      },
      addMoreFeeds(state, {page, feeds}) {
        Vue.set(state.feeds, page, feeds)
      },
      setFeedCount(state, count) {
        state.feedCount = count
      },
      setItems(state, {page, items}) {
        state.items = {}
        Vue.set(state.items, page, items)
      },
      addMoreItems(state, {page, items}) {
        Vue.set(state.items, page, items)
      },
    },
    getters: {
      starGroups(state) {
        return _.filter(state.groups, 'star')
      },
      starLikes(state) {
        return _.filter(state.likes, 'star')
      },
      starPages(state) {
        return _.filter(state.pages, 'star')
      },
      activeGroups(state) {
        return _.orderBy(state.groups, 'star', 'desc')
      },
      activeLikes(state) {
        return _.orderBy(state.likes, 'star', 'desc')
      },
      activePages(state) {
        return _.orderBy(state.pages, 'star', 'desc')
      },
      activeFeeds(state) {
        return state.feeds
      },
      activeItems(state) {
        return state.items
      },
    }
  })
}
