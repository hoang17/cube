<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    div(:class="$style.cp")
      Input(
        :value="value"
        :placeholder="ph"
        :class="$style.rgba"
        @change.native="setColor"
        autocorrect="off" autocapitalize="off" spellcheck="false")
      Input(
        :value="hex"
        :class="$style.hex"
        readonly="true")
      div(:class="$style.addon" @click="open")
        div(:class="$style.bg")
          div(:class="$style.inner" :style="{backgroundColor: value}")
    Sketch(v-model="colors" v-show="show" :class="$style.picker")
</template>
<script>
import Box from './Box'
import Input from './Input'
import Label from './Label'
import { Sketch } from 'vue-color'
import parse from 'parse-color'
import debounce from 'lodash/debounce'

export default {
  props:['lb','w','ph','value'],
  components: {
    Box, Input, Label, Sketch
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
  computed:{
    hex(){
      return parse(this.value).hex
    }
  },
  methods: {
    open(){
      let cc = parse(this.value)
      let c = cc.rgba
      if (c)
        this.colors = { hex:cc.hex, a: c[3], rgba: { r: c[0], g: c[1], b: c[2], a: c[3] } }
      this.show = !this.show
    },
    setColor(e) {
      let val = e.target.value
      if (!val)
        return this.$emit('input', val)

      let c = parse(val).rgba
      if (c)
        this.colors = { rgba: { r: c[0], g: c[1], b: c[2], a: c[3] } }
    }
  },
  watch: {
    colors(){
      let c = [...Object.values(this.colors.rgba)].join(',')
      let color = `rgba(${c})`
      this.$emit('input', color)
    }
  },
  data(){
    return {
      show: false,
      colors: {
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        }
      }
    }
  }
}
</script>
<style lang="stylus" module>
.cp
  display flex

.hex
  width 25%
  border-left 0
  margin-right 0!important
  background-color: #eceeef
  &:focus
    color #464a4c
    background-color: #eceeef
    border-color rgba(0,0,0,.15)
.rgba
  width 75%
  margin-right 0!important

.picker
  position absolute!important
  z-index 100

.addon
  width 35px
  height 28px
  padding 3px
  margin-bottom: 0
  font-size 13px
  line-height: 1.25
  color: #464a4c
  text-align: center
  background-color: #eceeef
  border: 1px solid rgba(0,0,0,.15)
  border-radius: .25rem
  /*white-space: nowrap
  vertical-align: middle
  display: flex
  flex-direction: column
  justify-content: center*/
  border-left 0
  border-bottom-left-radius 0
  border-top-left-radius 0
  cursor pointer

.bg
.inner
  width 100%
  height 100%
  border-radius 2px

.bg
  background url(/transparency10.png) -5px 0
</style>
