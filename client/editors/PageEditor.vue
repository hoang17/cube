<template lang="pug">
  v-card.elevation-0
    v-card-text
      h1.title Properties
      v-text-field(label='Content', v-model='cube.content')
      v-text-field(label='Font', v-model='cube.style.fontFamily')
      v-text-field(label='Color', v-model='cube.style.color')
      v-text-field(label='Size', v-model='cube.style.fontSize')
      v-text-field(label='Weight', v-model='cube.style.fontWeight')
      v-text-field(label='Line Height', v-model='cube.style.lineHeight')
      v-text-field(label='Letter Spacing', v-model='cube.style.letterSpacing')
      v-text-field(label='Text Alignment', v-model='cube.style.textAlign')
      v-text-field(label='Text Transform', v-model='cube.style.textTransform')
      v-text-field(label='Display', v-model='cube.style.display')
      v-text-field(label='Flex', v-model='cube.style.flex')
      v-text-field(label='Flex Flow', v-model='cube.style.flexFlow')
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
