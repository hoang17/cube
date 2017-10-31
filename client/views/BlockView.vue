<template lang="pug">
  div(:class="css")
    component(:cube="src", :is="src.type")
    i
</template>

<script>
import cssMixin from '../mixins/css'
export default {
  props: ['cube'],
  mixins: [cssMixin],
}
</script>

<style lang="stylus" module>
</style>
