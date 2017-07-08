<template lang="pug">
  .photo
    router-link(:to="'/i/' + id")
      img(:src="src")
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

.s1
  .photo
    img
      max-height none

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
