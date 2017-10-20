<template lang="pug">
  div
    input(label='Name', v-model='cube.content')
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
