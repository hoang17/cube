<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    div(:class="$style.cp")
      Input(
        :value="value"
        @change.native="setColor"
        :placeholder="ph"
        :class="$style.input"
        autocorrect="off" autocapitalize="off" spellcheck="false")
      div(:class="$style.addon" @click="show=!show")
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
  methods: {
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
          r: 25,
          g: 77,
          b: 51,
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

.input
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
  border-left: 0
  border-bottom-left-radius: 0
  border-top-left-radius: 0
  cursor pointer

.bg
.inner
  width 100%
  height 100%
  border-radius 2px

.bg
  background url(/transparency10.png) -5px 0
</style>
