<template lang="pug">
  div(:class="$style.stylebar")
    Input(label='Name', v-model='item.name', v-if="item")
    Input(label='Font', v-model='rule.fontFamily')
    Input(label='Color', v-model='rule.color')
    Input(label='Size', v-model='rule.fontSize')
    Input(label='Weight', v-model='rule.fontWeight')
    Input(label='Line Height', v-model='rule.lineHeight')
    Input(label='Letter Spacing', v-model='rule.letterSpacing')
    Input(label='Text Alignment', v-model='rule.textAlign')
    Input(label='Text Transform', v-model='rule.textTransform')
    Input(label='Width', v-model='rule.width')
    Input(label='Height', v-model='rule.height')
    Input(label='Margin', v-model='rule.margin')
    Input(label='Padding', v-model='rule.padding')
    Input(label='Display', v-model='rule.display')
    Input(label='Transform', v-model='rule.transform')
    Input(label='Min Width', v-model='rule.minWidth')
    Input(label='Min Height', v-model='rule.minHeight')
    Input(label='Max Width', v-model='rule.maxWidth')
    Input(label='Max Height', v-model='rule.maxHeight')
    Input(label='Position', v-model='rule.position')
    Input(label='Top', v-model='rule.top')
    Input(label='Bottom', v-model='rule.bottom')
    Input(label='Left', v-model='rule.left')
    Input(label='Right', v-model='rule.right')
</template>

<script>
import Input from './Input'
export default {
  props: ['item','rule'],
  components: {
    Input
  }
}
</script>

<style lang="stylus" module>
.stylebar
  text-align left
</style>
