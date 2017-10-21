<template lang="pug">
  div
    FieldSet
      Field(:w="2/3" lb="Title" v-model='cube.content')
      Field(:w="1/3" lb="Host" v-model='cube.host')
    FieldSet
      Field(:w="1/3" lb="Path" v-model='cube.path', prefix="/")
      Field(:w="2/3" lb="URL" v-model='cube.url' readonly)
</template>

<script>
import FieldSet from '../components/FieldSet'
import Field from '../components/Field'

export default {
  props: ['cube'],
  components: {
    FieldSet, Field
  },
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
