<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    Input(:value="value" @click.native="show=!show" @input="val => $emit('input', val)" :placeholder="ph" :style="{fontFamily: value}" :class="$style.input")
    div(:class="$style.select" v-show="show")
      ul(:class="$style.list")
        li(v-for="font in fonts" :style="{fontFamily: font}" @click="select(font)") {{ font }}
</template>

<script>
import Box from './Box'
import Input from './Input'
import Label from './Label'
export default {
  props: ['w','lb','ph','value'],
  components: {
    Box, Input, Label
  },
  mounted() {
    const onClick = e => {
      if (this.show)
        this.show = false
    }
    // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this
    const app = document.querySelector('[data-app]') || document.body
    app.addEventListener('click', onClick, true)
  },
  methods: {
    select(font) {
      this.show = false
      this.$emit('input', font)
    }
  },
  data(){
    return {
      show: false,
      fonts: [
        '-apple-system, BlinkMacSystemFont, sans-serif',
        'Helvetica Neue, Helvetica, Arial, sans-serif',
        'Avenir Next, Helvetica, Arial, sans-serif',
        'Verdana, sans-serif',
        'Lucida Grande, sans-serif',
        'Menlo, monospace',
        'Roboto, sans-serif',
        'Roboto Condensed, sans-serif',
        'Roboto Mono, monospace',
        'Roboto Slab, Georgia, serif',
        'Montserrat, sans-serif',
        'Open Sans, sans-serif',
        'Lato, sans-serif',
        'Source Sans Pro, sans-serif',
        'PT Sans, sans-serif',
        'PT Serif, serif',
        'Raleway, sans-serif',
        'Merriweather, Georgia, serif',
        'Noto Sans, sans-serif',
      ]
    }
  }
}
</script>

<style lang="stylus" module>
.input
  font-size 14px

.select
  position relative
  width 100%

.list
  position absolute
  background-color #fafafa
  z-index 100
  border 1px solid rgba(0,0,0,.15)
  overflow auto
  width 100%
  padding 0
  cursor pointer
  max-height 300px
  box-shadow 2px 2px 3px rgba(0,0,0,0.1)
  li
    line-height 2
    padding 0 10px
    white-space nowrap
    &:hover
      background-color #eee
</style>
