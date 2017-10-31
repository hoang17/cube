<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    //- input(
    //-   type="checkbox"
    //-   :checked="value"
    //-   @change="e => $emit('input', e.target.checked)")
    //- Label {{ value }}
    toggle-button(
      color="#82C7EB"
      :value="value"
      :sync="true"
      :labels="true"
      @input="val => $emit('input', val)")
</template>

<script>
import Box from './Box'
import Label from './Label'
export default {
  props: ['w','lb','ph','value'],
  components: {
    Box, Label
  }
}
</script>

<style lang="stylus" module>
</style>
