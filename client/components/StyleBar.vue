<template lang="pug">
  .style-bar
    v-text-field(label='Name', v-model='item.name', v-if="item")
    v-text-field(label='Font', v-model='rule.fontFamily')
    v-text-field(label='Color', v-model='rule.color')
    v-text-field(label='Size', v-model='rule.fontSize')
    v-text-field(label='Weight', v-model='rule.fontWeight')
    v-text-field(label='Line Height', v-model='rule.lineHeight')
    v-text-field(label='Letter Spacing', v-model='rule.letterSpacing')
    v-text-field(label='Text Alignment', v-model='rule.textAlign')
    v-text-field(label='Text Transform', v-model='rule.textTransform')
    v-text-field(label='Width', v-model='rule.width')
    v-text-field(label='Height', v-model='rule.height')
    v-text-field(label='Margin', v-model='rule.margin')
    v-text-field(label='Padding', v-model='rule.padding')
    v-text-field(label='Display', v-model='rule.display')
    v-text-field(label='Min Width', v-model='rule.minWidth')
    v-text-field(label='Min Height', v-model='rule.minHeight')
    v-text-field(label='Max Width', v-model='rule.maxWidth')
    v-text-field(label='Max Height', v-model='rule.maxHeight')
</template>

<script>
export default {
  props: ['item','rule'],
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
