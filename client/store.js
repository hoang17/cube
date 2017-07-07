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

async function fetchGroups(token){
  return fetch(token, 'v2.3/me/groups?fields=id,name,privacy,administrator,bookmark_order,unread,description,owner,icon,members.summary(true).limit(0)')
}

async function fetchLikes(token, type){
  return fetch(token, `v2.6/me/${type}?fields=id,name,category,about,description,phone,single_line_address,created_time,fan_count,rating_count,talking_about_count,picture{url}`)
}

export function createStore () {
  return new Vuex.Store({
    state: {
      user: null,
      token: null,
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
        let groups = await fetchGroups(state.token)
        commit('setGroups', groups)
        state.gv = groupVersions(groups.data)
      },
      async getLikes({ state, commit }) {
        if (state.likes.length > 0) return
        let likes = await fetchLikes(state.token, 'likes')
        commit('setLikes', likes)
      },
      async getPages({ state, commit }) {
        if (state.pages.length > 0) return
        let pages = await fetchLikes(state.token, 'accounts')
        commit('setPages', pages)
      },
      async getMoreGroups({ state, commit }) {
        if (state.groups.paging.next) {
          let groups = await fetch(state.token, state.groups.paging.next)
          if (groups.data.length > 0){
            state.groups.data = state.groups.data.concat(groups.data)
            state.groups.paging = groups.paging
          }
        }
      },
      async getMoreLikes({ state, commit }) {
        if (state.likes.paging.next) {
          let likes = await fetch(state.token, state.likes.paging.next)
          if (likes.data.length > 0){
            state.likes.data = state.likes.data.concat(likes.data)
            state.likes.paging = likes.paging
          }
        }
      },
      async getMorePages({ state, commit }) {
        if (state.pages.paging.next) {
          let pages = await fetch(state.token, state.pages.paging.next)
          if (pages.data.length > 0){
            state.pages.data = state.pages.data.concat(pages.data)
            state.pages.paging = pages.paging
          }
        }
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
          let groups = await fetchGroups(state.token)
          commit('setGroups', groups)
          let likes = await fetchLikes(state.token, 'likes')
          commit('setLikes', likes)
          let pages = await fetchLikes(state.token, 'accounts')
          commit('setPages', pages)

          state.gv = groupVersions(groups.data)
        }
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'

        const offset = (page-1) * state.itemsPerPage

        let items = await fetchItems(state.token, id, offset, state.itemsPerPage, ver)
        commit('setItems', { page, items })
      },
      async fetchMoreItems({ state, commit }, {id, page}) {
        let ver = state.gv[id] ? state.gv[id] : 'v2.3'
        const offset = (page-1) * state.itemsPerPage
        let items = await fetchItems(state.token, id, offset, state.itemsPerPage, ver)
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
      activeGroups(state) {
        return _.orderBy(state.groups.data, 'star', 'desc')
      },
      activeLikes(state) {
        return _.orderBy(state.likes.data, 'star', 'desc')
      },
      activePages(state) {
        return _.orderBy(state.pages.data, 'star', 'desc')
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
