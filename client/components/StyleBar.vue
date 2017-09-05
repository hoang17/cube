<template lang="pug">
  .style-bar
    v-text-field(label='Font', v-model='stl.fontFamily')
    v-text-field(label='Color', v-model='stl.color')
    v-text-field(label='Size', v-model='stl.fontSize')
    v-text-field(label='Weight', v-model='stl.fontWeight')
    v-text-field(label='Line Height', v-model='stl.lineHeight')
    v-text-field(label='Letter Spacing', v-model='stl.letterSpacing')
    v-text-field(label='Text Alignment', v-model='stl.textAlign')
    v-text-field(label='Text Transform', v-model='stl.textTransform')
    v-text-field(label='Width', v-model='stl.width')
    v-text-field(label='Height', v-model='stl.height')
    v-text-field(label='Margin', v-model='stl.margin')
    v-text-field(label='Padding', v-model='stl.padding')
    v-text-field(label='Display', v-model='stl.display')
    v-text-field(label='Min Width', v-model='stl.minWidth')
    v-text-field(label='Min Height', v-model='stl.minHeight')
    v-text-field(label='Max Width', v-model='stl.maxWidth')
    v-text-field(label='Max Height', v-model='stl.maxHeight')
</template>

<script>
export default {
  props: ['stl'],
  data () {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
.style-bar
  text-align left

  .btn--icon
    width 20px
    height 20px
    .icon
      font-size 20px

</style>
