<template lang="pug">
  Field(lb='Name' v-model='cube.content')
</template>

<script>
import Field from '../components/Field'
export default {
  props: ['cube'],
  components: {
    Field
  }
}
</script>

<style lang="stylus" scoped>
</style>
