<template lang="pug">
  div
    textarea-autosize(placeholder='Enter text...', v-model='cube.content', :min-height='30', :max-height='350')
    //- vue-select(:options='styles', v-model='cube.css', label="name")
    v-text-field(label='Font', v-model='cube.style.fontFamily')
    v-text-field(label='Color', v-model='cube.style.color')
    v-text-field(label='Size', v-model='cube.style.fontSize')
    v-text-field(label='Weight', v-model='cube.style.fontWeight')
    v-text-field(label='Line Height', v-model='cube.style.lineHeight')
    v-text-field(label='Letter Spacing', v-model='cube.style.letterSpacing')
    v-text-field(label='Text Alignment', v-model='cube.style.textAlign')
    v-text-field(label='Text Transform', v-model='cube.style.textTransform')
    v-text-field(label='Width', v-model='cube.style.width')
    v-text-field(label='Display', v-model='cube.style.display')
    v-text-field(label='Margin', v-model='cube.style.margin')
    v-text-field(label='Padding', v-model='cube.style.padding')
</template>

<script>
import Vue from 'vue'
import VueTextareaAutosize from 'vue-textarea-autosize'
// import VueSelect from 'vue-select'

Vue.use(VueTextareaAutosize)

export default {
  props: ['cube'],
  components: {
    // VueSelect
  },
  data () {
    return {
    }
  },
  computed: {
    // styles(){
    //   return this.$store.state.styles
    // },
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
