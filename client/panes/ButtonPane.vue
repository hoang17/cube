<template lang="pug">
  div
    input(label='Name', v-model='cube.content')
    input(label='URL', v-model='cube.url')
    //- input(label='Font', v-model='cube.style.fontFamily')
    //- input(label='Color', v-model='cube.style.color')
    //- input(label='Size', v-model='cube.style.fontSize')
    //- input(label='Weight', v-model='cube.style.fontWeight')
    //- input(label='Line Height', v-model='cube.style.lineHeight')
    //- input(label='Letter Spacing', v-model='cube.style.letterSpacing')
    //- input(label='Text Alignment', v-model='cube.style.textAlign')
    //- input(label='Text Transform', v-model='cube.style.textTransform')
    //- input(label='Margin', v-model='cube.style.margin')
    //- input(label='Width', v-model='cube.style.width')
    //- input(label='Height', v-model='cube.style.height')
    //- input(label='Display', v-model='cube.style.display')
</template>

<script>
export default {
  props: ['cube'],
  methods: {
  },
}
</script>

<style lang="stylus" scoped>
</style>
