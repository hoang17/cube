<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    Select(:value="value" @input="val => $emit('input', val)")
      slot
</template>

<script>
import Box from './Box'
import Select from './Select'
import Label from './Label'
export default {
  props: ['w','lb','ph','value'],
  components: {
    Box, Select, Label
  },
}
</script>

<style lang="stylus" module>
</style>
