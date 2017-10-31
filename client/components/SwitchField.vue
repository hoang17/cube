<template lang="pug">
  Box(:w='w')
    Label(
      :for="id"
      :class="$style.label") {{ lb }}
    input(
      :id="id"
      :class="$style.input"
      :checked="value"
      type="checkbox"
      @change="e => $emit('input', e.target.checked)")
    //- Label {{ value }}
    //- toggle-button(
    //-   color="#82C7EB"
    //-   :value="value"
    //-   :sync="true"
    //-   :labels="true"
    //-   @input="val => $emit('input', val)")
</template>

<script>
import Box from './Box'
import Label from './Label'
export default {
  props: ['w','lb','ph','value','id'],
  components: {
    Box, Label
  }
}
</script>

<style lang="stylus" module>
.label
  display: inline-block
  padding-right: 10px
.input
  display: inline-block
</style>
