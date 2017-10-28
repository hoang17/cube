<template lang="pug">
  Box(:w='w')
    Label(:class="myStyle" top) {{ lb }}
    Input(
      :ph="ph"
      type="text"
      :readonly="readonly"
      :value="value"
      @input="val => $emit('input', val)"
      @change.native="e => $emit('change', e.target.value)")
</template>

<script>
import { css } from 'emotion'

const myStyle = css`
  color: tomato
`

import Box from './Box'
import Input from './Input'
import Label from './Label'
export default {
  props: ['w','lb','ph','value','readonly'],
  components: {
    Box,
    Input,
    Label,
    // Button
  },
  data(){
    return {
      myStyle: myStyle
    }
  }
}
</script>

<style lang="stylus" module>
</style>
