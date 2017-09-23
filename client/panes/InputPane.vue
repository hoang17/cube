<template lang="pug">
  div
    v-text-field(label='Name', v-model='cube.content')
    v-text-field(label='Place Holder', v-model='cube.placeholder')
    //- vue-select(:options='styles', v-model='cube.css', label="name")
    //- v-text-field(label='Font', v-model='cube.style.fontFamily')
    //- v-text-field(label='Color', v-model='cube.style.color')
    //- v-text-field(label='Size', v-model='cube.style.fontSize')
    //- v-text-field(label='Weight', v-model='cube.style.fontWeight')
    //- v-text-field(label='Line Height', v-model='cube.style.lineHeight')
    //- v-text-field(label='Letter Spacing', v-model='cube.style.letterSpacing')
    //- v-text-field(label='Text Alignment', v-model='cube.style.textAlign')
    //- v-text-field(label='Text Transform', v-model='cube.style.textTransform')
    //- v-text-field(label='Width', v-model='cube.style.width')
    //- v-text-field(label='Display', v-model='cube.style.display')
    //- v-text-field(label='Margin', v-model='cube.style.margin')
    //- v-text-field(label='Padding', v-model='cube.style.padding')
</template>

<script>
import Vue from 'vue'

export default {
  props: ['cube'],
  data() {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
