<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    toggle-button(
      color="#82C7EB"
      :value="value"
      :sync="true"
      :labels="true"
      @input="val => $emit('input', val)")
    //-Input(:ph="ph" type="text", :value="value" @input="val => $emit('input', val)")
</template>

<script>
import Box from './Box'
import Input from './Input'
import Label from './Label'
export default {
  props: ['w','lb','ph','value'],
  components: {
    Box, Label
  },
}
</script>

<style lang="stylus" module>
</style>
