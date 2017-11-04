<template lang="pug">
  modal(name='font-modal' transition='pop-out', :width='modalWidth', :height='600')
    div(:class="$style.fontSelect")
      ul(v-for="type in types")
        li(:class="$style.header")
          div(:class="$style.line")
          div(:class="$style.label") {{ type.name }}
          div(:class="$style.line")
        li(v-for="font in type.fonts", :class="{[$style.active]: value==font.family}" @click="selectFont(font)")
          img(:src="fontUrl+font.png", height='30', :alt='font.family')
</template>

<script>
import { types } from '../data/types'
import { mapGetters } from 'vuex'
const ImportWebFont = () => import('webfontloader')
const isProd = process.env.NODE_ENV === 'production'

const MODAL_WIDTH = 300

export default {
  props: ['value'],
  data () {
    return {
      types,
      modalWidth: MODAL_WIDTH    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  computed: {
    ...mapGetters([
      'page'
    ]),
    fontUrl(){
      return isProd ? 'https://bin.netlify.com/types/' :'/types/'
    },
  },
  methods: {
    selectFont({family, css}) {
      if (!css) return
      ImportWebFont().then(WebFont => {
        WebFont.load({
          custom: {
            families: [family],
            urls: [this.fontUrl+css]
          },
          active: () => {
            this.setFont(family)
          }
          // google: {
          //   families: [family]
          // },
        })
      })
      this.$modal.hide('font-modal')
    },
    setFont(family) {
      // let p, i = this.value
      //
      // // Add font to page
      // if (!this.page.fonts) this.page.fonts = {}
      // p = this.page.fonts
      // let count = p[family]
      // count = count ? count + 1 : 1
      // this.$set(p, family, count)
      //
      // // remove old font
      // if (p[i]){
      //   p[i]--
      //   if (p[i] == 0) this.$delete(p, i)
      // }
      this.$emit('input', family)
    }
  },
}
</script>

<style lang="stylus" module>
.font-select
  max-height 600px
  overflow-y scroll
  overflow-x hidden
  /*height calc(100% - 8px)*/
  ul
    //min-width 80px
    //max-height 50vh
    //overflow-y scroll
    //overflow-x hidden
    //height calc(100% - 8px)
    box-sizing border-box
    border-radius inherit
    padding 0
    cursor pointer
    li
      user-select none
      list-style none
      display flex
      padding 5px
      margin 0
      padding-left 1em
      transition background-color .1s ease
      &:hover
      &.active
        background-color: #ebece9
        /*background-color: rgba(0,0,0,.12)*/

  .header
    display flex
    .line
      //background-color rgba(63,70,82,.15)
      background-color #666
      flex-grow 1
      height 1px
      margin auto
    .label
      //color rgba(63,70,82,.4)
      font-size 14px
      font-weight 500
      margin 8px 20px
      min-width 40px
      text-align center
      text-transform uppercase

  img:not([alt='Proxima Nova']):not([alt='SF Pro Display'])
    filter invert(100%)
</style>
