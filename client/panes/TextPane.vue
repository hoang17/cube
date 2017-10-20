<template lang="pug">
  div
    textarea-autosize(placeholder='Enter text...', v-model='cube.content', :min-height='minHeight', :max-height='350')
    //- vue-select(:options='styles', v-model='cube.css', label="name")
    //- input(label='Font', v-model='cube.style.fontFamily')
    //- input(label='Color', v-model='cube.style.color')
    //- input(label='Size', v-model='cube.style.fontSize')
    //- input(label='Weight', v-model='cube.style.fontWeight')
    //- input(label='Line Height', v-model='cube.style.lineHeight')
    //- input(label='Letter Spacing', v-model='cube.style.letterSpacing')
    //- input(label='Text Alignment', v-model='cube.style.textAlign')
    //- input(label='Text Transform', v-model='cube.style.textTransform')
    //- input(label='Width', v-model='cube.style.width')
    //- input(label='Display', v-model='cube.style.display')
    //- input(label='Margin', v-model='cube.style.margin')
    //- input(label='Padding', v-model='cube.style.padding')
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
