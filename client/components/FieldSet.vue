<template lang="pug">
  div(:class="$style.fieldset")
    slot
</template>
<script>
export default {
}
</script>
<style lang="stylus" module>
.fieldset
  display flex
  align-items center
  &:not(:last-child)
    margin-bottom: .8rem
</style>
