<template lang="pug">
  div
    FieldSet
      Field(lb='Name' v-model='cube.content')
    //- FieldSet
      Field(lb='URL' v-model='cube.url')
    FieldSet
      Field(lb='Amount' v-model='cube.amount')
    FieldSet
      Field(lb='Handle' v-model='cube.handle')
    FieldSet
      Field(lb='Label' v-model='cube.label')
    FieldSet
      Field(lb='Panel Label' v-model='cube.panelLabel')
    FieldSet
      Field(lb='Description' v-model='cube.description')
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
