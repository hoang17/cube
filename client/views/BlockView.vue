<template lang="pug">
  div(:class="css")
    component(:cube="src", :is="src.type")
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
