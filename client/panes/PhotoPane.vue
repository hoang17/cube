<template lang="pug">
  div
    FieldSet
      Field(lb='Name' v-model='cube.content')
    FieldSet
      Field(lb='URL' v-model='cube.url')
    FieldSet
      UploadField(lb='Upload Photo' v-model='cube.url')
</template>

<script>
import Field from '../components/Field'
import UploadField from '../components/UploadField'
import FieldSet from '../components/FieldSet'
export default {
  props: ['cube'],
  components: {
    Field, FieldSet, UploadField
  }
}
</script>

<style lang="stylus" scoped>
</style>
