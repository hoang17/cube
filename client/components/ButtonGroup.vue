<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    div(:class="$style.group")
      slot
</template>
<script>
import Box from './Box'
import Label from './Label'
export default {
  props: ['w','lb'],
  components: {
    Box, Label
  },
}
</script>
<style lang="stylus" module>
.group
  display flex
  justify-content flex-start
</style>
