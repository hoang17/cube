<template lang="pug">
  div(:class="$style.flex")
    slot
</template>
<script>
export default {
}
</script>
<style lang="stylus" module>
.flex
  display flex
  align-items center
  justify-content: center
  align-content: center
  &:not(:last-child)
    margin-bottom: .8rem
</style>
