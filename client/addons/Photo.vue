<template lang="pug">
  .photo
    a(:href="'http://facebook.com/' + id", target='_blank', rel='noopener')
      img(v-lazy="src")
</template>

<script>
export default {
  props: {
    id: String,
		src: String,
  }
}
</script>

<style lang="stylus" scoped>
.photo
  img
    margin-top 5px
    max-width 100%
    max-height 500px

@keyframes fadeIn
  from {
    opacity 0
  }
  to {
    opacity 1
  }

img[lazy=loaded]
  animation-duration .5s
  animation-fill-mode both
  animationmode both
  animation-name fadeIn
</style>
