<template lang="pug">
  div
    textarea-autosize(placeholder='Enter text...', v-model='cube.content', :min-height='minHeight', :max-height='350')
    //- vue-select(:options='styles', v-model='cube.css', label="name")
</template>

<script>
import Vue from 'vue'
import TextareaAutosize from '../addons/TextareaAutosize'
// import VueSelect from 'vue-select'
// import VueTextareaAutosize from 'vue-textarea-autosize'
// Vue.use(VueTextareaAutosize)

export default {
  props: ['cube'],
  components: {
    TextareaAutosize // VueSelect
  },
  data() {
    return {
      minHeight: 50
    }
  },
}
</script>

<style lang="stylus" scoped>
textarea
  padding 10px 5px
  resize none
  width 100%
  max-height 500px
  border 1px solid #dddfe2
  border-radius 2px
  -webkit-appearance none
  box-shadow inset -1px 1px 2px rgba(0,0,0,.1)

  &:focus
    outline none
</style>
