<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    div(:class="$style.slider")
      Slider(
        :class="['slider', $style.range]"
        :min="min"
        :max="max"
        :step="step"
        :value="val"
        @input="slide")
      Input(:value="value", :class="$style.input" @input="val => $emit('input', val)", :ph="ph")
</template>

<script>
import Box from './Box'
import Label from './Label'
import Input from './Input'
import Slider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  props: ['w','lb','ph','value','subfix','min','max','step'],
  components: {
    Box, Label, Input, Slider
  },
  computed: {
    val(){
      return parseFloat(this.value) || (this.max-Math.abs(this.min))/2
    }
  },
  methods: {
    slide(val) {
      let v = this.step == 1 ? parseInt(val) : val.toFixed(2)
      if (!v) v = this.step == 1 ? 0 : ''
      let e = this.subfix ? v + this.subfix : v
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="stylus" module>
.slider
 display flex

.range
  width 80%
  flex 1 1 80%
  margin-right 10px

.input
  width 20%
  flex 1 1 20%

:global(.range-slider-fill)
  background-color #ccc
</style>
