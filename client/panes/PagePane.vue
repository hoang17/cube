<template lang="pug">
  div
    FieldSet
      Field(lb="Title" v-model='cube.content')
    FieldSet
      Field(:w="1/2" lb="Host" v-model='cube.host')
      Field(:w="1/2" lb="Path" v-model='cube.path', prefix="/")
    FieldSet
      Field(lb="URL" v-model='cube.url' readonly)
</template>

<script>
import FieldSet from '../components/FieldSet'
import Field from '../components/Field'
import Input from '../components/Input'

export default {
  props: ['cube'],
  components: {
    FieldSet, Field, Input
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
