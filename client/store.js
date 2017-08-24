import Vue from 'vue'
import Vuex from 'vuex'
import _  from 'lodash'

Vue.use(Vuex)

import { get, fetch, fetchData, fetchItems, fetchItem, patch, fetchPage, savePage } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      sites: null,
      page: {
        name: 'Page',
        url: '/',
        userId: null,
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
          textAlign: 'center'
        },
        cubes: [],
      },
      // cubes: [],
      item: null,
      user: null,
      token: null,
      itemsPerPage: 20,
      groups: [],
      likes: [],
      pages: [],
      feeds: {},
      items: {},
      feedCount: 0,
      account: null,
    },
    actions: {
      async savePage({ state, commit }) {
        let data = await savePage(state.page)
        state.page._id = data._id
      },
      async fetchPage({ state, commit }, { id }) {
        if (id) {
          let page = await fetchPage(id)
          commit('setPage', page)
        }
      },
      async getGroups({ state, commit }) {
        if (state.groups.length > 0) return
        let groups = await fetchGroups(state.token)
        commit('setGroups', groups)
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
          let groups = await fetchData(state.token, state.groups.paging.next)
          if (groups.data.length > 0){
            state.groups.data = state.groups.data.concat(groups.data)
            state.groups.paging = groups.paging
          }
        }
      },
      async getMoreLikes({ state, commit }) {
        if (state.likes.paging.next) {
          let likes = await fetchData(state.token, state.likes.paging.next)
          if (likes.data.length > 0){
            state.likes.data = state.likes.data.concat(likes.data)
            state.likes.paging = likes.paging
          }
        }
      },
      async getMorePages({ state, commit }) {
        if (state.pages.paging.next) {
          let pages = await fetchData(state.token, state.pages.paging.next)
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
      async fetchItem({ state, commit }, { id }) {
        let gid = id.split('_')[0]
        if (!state.groups){
          let groups = await fetchGroups(state.token)
          commit('setGroups', groups)
        }
        let item = await fetchItem(state.token, id)
        commit('setItem', item)
      },
      async fetchItems({ state, commit }, {id, type, page}) {
        if (!state.groups || state.groups.length == 0){
          let groups = await fetchGroups(state.token)
          commit('setGroups', groups)
          let likes = await fetchLikes(state.token, 'likes')
          commit('setLikes', likes)
          let pages = await fetchLikes(state.token, 'accounts')
          commit('setPages', pages)
        }

        let list
        if (type == 'groups'){
          list = state.groups.data
        } else if (type == 'likes'){
          list = state.likes.data
        } else {
          list = state.pages.data
        }
        let account = list.filter(function(e){
          return e.id == id
        })[0]

        if (!account)
          if (type == 'groups')
            account = await fetchGroup(state.token, id)
          else
            account = await fetchPage(state.token, id)

        commit('setAccount', account)

        const offset = (page-1) * state.itemsPerPage

        let items = await fetchItems(state.token, id, type, offset, state.itemsPerPage)
        commit('setItems', { page, items })
      },
      async fetchMoreItems({ state, commit }, {id, type, page}) {
        const offset = (page-1) * state.itemsPerPage
        let items = await fetchItems(state.token, id, type, offset, state.itemsPerPage)
        if (items.length > 0)
          commit('addMoreItems', { page, items })
      },
      async fetchObj({ state, commit }, { id }) {
        if (!state.groups || state.groups.length == 0){
          let groups = await fetchGroups(state.token)
          commit('setGroups', groups)
          let likes = await fetchLikes(state.token, 'likes')
          commit('setLikes', likes)
          let pages = await fetchLikes(state.token, 'accounts')
          commit('setPages', pages)
        }
      },
    },
    mutations: {
      setCubes(state, cubes) {
        state.page.cubes = cubes
      },
      setPage(state, page) {
        state.page = page
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
      setItem(state, item) {
        state.item = item
      },
      setItems(state, {page, items}) {
        state.items = {}
        Vue.set(state.items, page, items)
      },
      addMoreItems(state, {page, items}) {
        Vue.set(state.items, page, items)
      },
      setAccount(state, account) {
        state.account = account
      },
      setStar(state, {item, type}) {
        patch(`${type}/${item.id}`, { star: item.star })
      },
    },
    getters: {
      cubes(state) {
        return state.page.cubes
      },
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

// const getActiveItems =  function(page, itemsPerPage, items, start = 0){
//   page = Number(page) || 1
//   const end = page * itemsPerPage
//   return items.slice(start, end)
// }
//
// function chunk(a, size) {
//   let chunks = [], i = 0, p =0, l = a.length
//   while (i < l) {
//     p++
//     let c = a.slice(i, i += size)
//     chunks.push({ p, c })
//   }
//   return chunks
// }
//
// function groupVersions(groups){
//   return _.fromPairs(_.map(groups, i => [i.id, i.ver]))
// }

async function fetchGroups(token){
  return fetchData(token, 'v2.6/me/groups?fields=id,name,privacy,administrator,bookmark_order,unread,description,owner,icon,members.summary(true).limit(0)')
}

async function fetchLikes(token, type){
  return fetchData(token, `v2.6/me/${type}?fields=id,name,access_token,category,about,description,phone,single_line_address,fan_count,rating_count,talking_about_count,picture{url}`)
}

async function fetchGroup(token, id){
  return fetch(token, `v2.6/${id}?fields=id,name,privacy,description,owner,icon,members.summary(true).limit(0)`)
}

// async function fetchPage(token, id){
//   return fetch(token, `v2.6/${id}?fields=id,name,category,about,description,phone,single_line_address,fan_count,rating_count,talking_about_count,picture{url}`)
// }
