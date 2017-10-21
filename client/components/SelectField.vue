<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    Select
      slot
</template>

<script>
import Box from './Box'
import Select from './Select'
import Label from './Label'
export default {
  props: ['w','lb','ph'],
  components: {
    Box, Select, Label
  },
}
</script>

<style lang="stylus" module>
</style>
