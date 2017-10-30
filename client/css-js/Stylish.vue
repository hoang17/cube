<template lang="pug">
  div(:class="className" @click="active=!active") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

import stylish from './stylish.js'

const css = stylish()
const className = 'test'
css([cssC, wrapper], className)

export default {
  data(){
    return {
      className,
      active: false,
    }
  },
  watch: {
    active(){
      css({
        // color: this.active ? 'blue' : 'brown',
        color: this.active ? 'red' : wrapper.color,
        fontSize: this.active ? '3em' : wrapper.fontSize,
        '&:hover': {
          color: this.active ? 'blue' : 'brown',
        }
      }, className)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
