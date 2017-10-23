<template lang="pug">
  Box(:w='w')
    Label(top) {{ lb }}
    div(:class="$style.group")
      Button(v-for="(v, i) in list"
        @click.native="select(i)"
        :active="i==value"
        :key="i") {{ v }}
</template>
<script>
import Box from './Box'
import Label from './Label'
import Button from './Button'
import fromPairs from 'lodash/fromPairs'
import map from 'lodash/map'

export default {
  props: ['w','lb','list','value'],
  components: {
    Box, Label, Button
  },
  methods: {
    select(i) {
      if (this.value == i)
        this.$emit('input', null)
      else
        this.$emit('input', i)
    }
  }
}
</script>
<style lang="stylus" module>
.group
  display flex
  justify-content flex-start
</style>
