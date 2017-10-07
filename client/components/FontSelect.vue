<template lang="pug">
  div(:class="$style.fontSelect")
    ul(v-for="type in types")
      li(:class="$style.header")
        div(:class="$style.line")
        div(:class="$style.label") {{ type.name }}
        div(:class="$style.line")
      li(v-for="font in type.fonts", :class="{[$style.active]: rule.fontFamily==font.family}")
        button(@click="selectFont(font)")
          img(:src="'/types/'+font.png", height='30', :alt='font.family')
    //-.toolbar__fontCta
      .toolbar__fontCtaLabel Upload your own fonts!
      button.button.buttonSmall.toolbar__fontCtaButton LEARN MORE
</template>

<script>
import { types } from '../data/types'
import WebFont from 'webfontloader'
import { mapGetters } from 'vuex'

export default {
  props: ['item','rule'],
  data () {
    return {
      types,
    }
  },
  computed: {
    ...mapGetters([
      'page'
    ]),
  },
  methods: {
    selectFont({family, css}) {
      if (!css) return
      WebFont.load({
        custom: {
          families: [family],
          urls: ['/types/'+css]
        },
        active: () => {
          this.setFont(family)
        }
        // google: {
        //   families: [family]
        // },
      })
    },
    setFont(family) {
      let p, i = this.rule.fontFamily

      if (this.item){
        // Add font to style
        this.item.font = family
      }
      else {
        // Add font to page
        if (!this.page.fonts) this.page.fonts = {}
        p = this.page.fonts
        let count = p[family]
        count = count ? count + 1 : 1
        this.$set(p, family, f)

        // remove old font
        if (p[i]){
          p[i]--
          if (p[i] == 0) this.$delete(p, i)
        }
      }

      this.rule.fontFamily = family
    }
  },
}
</script>

<style lang="stylus" module>
.font-select
  max-height 70vh
  overflow-y scroll
  overflow-x hidden
  height calc(100% - 8px)
  ul
    //min-width 80px
    //max-height 50vh
    //overflow-y scroll
    //overflow-x hidden
    //height calc(100% - 8px)
    box-sizing border-box
    border-radius inherit
    padding 0

  li
    user-select none
    list-style none
    padding 0
    &:hover
    &.active
      background-color: rgba(0,0,0,.12)

  button
    display flex
    padding-right 33px
    background-position 1em center
    background-repeat no-repeat
    background-size auto 30px
    overflow: hidden
    width 100%
    height 35px
    padding 0
    margin 0
    text-align left
    padding-left 1em
    transition background-color .1s ease
    outline none
    /*-ms-flex-pack justify
    justify-content space-between*/

  .header
    display flex
    .line
      //background-color rgba(63,70,82,.15)
      background-color #666
      -ms-flex-positive 1
      flex-grow 1
      height 1px
      margin auto
    .label
      //color rgba(63,70,82,.4)
      font-size 11px
      font-weight 500
      margin 8px 20px
      min-width 40px
      text-align center
      text-transform uppercase

:global(.application--light)
  .font-select
    li
      .active
      &:hover
        background-color: #ebece9
    img
      filter invert(100%)
</style>
