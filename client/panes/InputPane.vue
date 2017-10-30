<template lang="pug">
  div
    FieldSet
      Field(lb='Name' v-model='cube.content')
    FieldSet
      Field(lb='Place Holder' v-model='cube.placeholder')
</template>

<script>
import Field from '../components/Field'
import FieldSet from '../components/FieldSet'
export default {
  props: ['cube'],
  components: {
    Field, FieldSet
  }
}
</script>

<style lang="stylus" scoped>
</style>
