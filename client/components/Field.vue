<template lang="pug">
  Box(:w='w')
    Label {{ lb }}
    Input(:placeholder="ph || lb" type="text" :value="value")
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
}
</script>

<style lang="stylus" module>
</style>
