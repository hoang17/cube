<template lang="pug">
.nav-wrapper
  .news-list-nav(@click.stop="", v-sticky="{ stickyClass: 'sticky-header' }", v-if="maxPage")
    a(v-if='page > 1', @click.prevent="previous", :href="`/${type}/${id}/${page-1}`") ←
    a.disabled(v-else='') ←
    span.mdl-selectfield {{page}}
    //-span.mdl-selectfield
      select.mdc-select(v-model="selectedPage", @change="pageSelected")
        option(v-for="n in range", :value="n", :disabled="n=='...'") {{ n }}
    a(v-if='hasMore', @click.prevent="next", :href="`/${type}/${id}/${page+1}`") →
    a.disabled(v-else='') →
</template>

<script>
import Sticky from '../directives/Sticky'
import { range, union, throttle } from 'lodash'

export default {
  directives: {
    'sticky': Sticky,
  },
  props: {
    id: String,
    type: String,
    page: Number,
    maxPage: Number,
  },
  data() {
    return {
      selectedPage: this.page
    }
  },
  watch: {
    page(){
      this.selectedPage = this.page
    }
  },
  computed: {
    // range() {
    //   let delta = 100
    //   if (this.maxPage <= delta + 20)
    //     return range(1, this.maxPage+1)
    //   let begin = this.page-delta > 0 ? this.page-delta : 1
    //   let end = this.page+delta > this.maxPage ? this.maxPage : this.page+delta
    //   let middle = range(begin, end+1)
    //   let first = range(1, 6)
    //   let last = range(this.maxPage-5, this.maxPage+1)
    //
    //   if (begin <= 6)
    //     return [...union(first, middle), '...', ...last]
    //
    //   if (end >= this.maxPage-6)
    //     return [...first, '...', ...union(middle, last)]
    //
    //   return [...first, '...', ...middle, '...', ...last]
    // },
    hasMore() {
      return this.page < this.maxPage
    }
  },
  methods: {
    next() {
      this.$emit('nextPage')
    },
    previous() {
      this.$emit('previousPage')
    },
    pageSelected() {
      this.$emit('pageSelected', this.selectedPage)
    },
  }
}
</script>

<style lang="stylus">
.nav-wrapper
  height 55px
  z-index 999
  position relative

.news-list-nav
  font-family "HelveticaNeue-CondensedBold", "Helvetica Neue", Arial, sans-serif
  background-color #fff
  border-radius 2px
  font-weight 500
  font-size 18px
  padding 5px 0
  text-align center
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    font-size 24px
    margin 0 2em
  .disabled
    color #ccc

  select
    font-size 18px
    background-color transparent
    border none
    /*border-bottom 1px solid rgba(0,0,0, 0.12)*/
    padding 0 17px 0 2px
    border-radius 0
    &:focus
      outline none

  /*.mdl-selectfield
    position relative
    select
      -webkit-appearance none
      -moz-appearance none
      appearance none
    &:after
      position absolute
      top 0.55em
      right 0.1em
      width 0
      height 0
      padding 0
      content ''
      border-left .25em solid transparent
      border-right .25em solid transparent
      border-top 0.375em solid #ccc
      pointer-events none*/
</style>
