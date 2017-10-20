<template lang="pug">
  div(:class="$style.expansion")
    slot
</template>

<script>
export default {
}
</script>

<style lang="stylus" module>
.expansion
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  flex-wrap: wrap
  justify-content: center
  list-style-type: none
  padding: 0
  text-align: left
  width: 100%
  border-bottom: 1px solid #d1d1d1
</style>
