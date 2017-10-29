<template lang="pug">
  div(:class="className" @click="active=!active") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

import { css, update } from './stylish.js'

const rule = css([cssC, wrapper])
const className = rule.key

export default {
  data(){
    return {
      className,
      active: false,
    }
  },
  watch: {
    active(){
      update(rule, {
        color: this.active ? 'red' : wrapper.color,
        fontSize: this.active ? '3em' : wrapper.fontSize
      })
    }
  }
}
</script>

<style lang="stylus" module>
</style>
