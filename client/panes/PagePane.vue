<template lang="pug">
  div
    input(label='Title', v-model='cube.content')
    input(label='Host', v-model='cube.host')
    input(label='Path', v-model='cube.path', prefix="/")
    input(label='URL', v-model='cube.url', readonly)
    //- input(label='Font', v-model='cube.style.fontFamily')
    //- input(label='Color', v-model='cube.style.color')
    //- input(label='Size', v-model='cube.style.fontSize')
    //- input(label='Weight', v-model='cube.style.fontWeight')
    //- input(label='Line Height', v-model='cube.style.lineHeight')
    //- input(label='Letter Spacing', v-model='cube.style.letterSpacing')
    //- input(label='Text Alignment', v-model='cube.style.textAlign')
    //- input(label='Display', v-model='cube.style.display')
    //- input(label='Text Transform', v-model='cube.style.textTransform')
    //- input(label='Flex', v-model='cube.style.flex')
    //- input(label='Flex Flow', v-model='cube.style.flexFlow')
</template>

<script>

export default {
  props: ['cube'],
  computed: {
    url(){
      return this.cube.host + '/' + this.cube.path
    }
  },
  watch: {
    url(){
      this.cube.url = this.url
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
