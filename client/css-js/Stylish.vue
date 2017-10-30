<template lang="pug">
  div(:class="className" @click="active=!active") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

import { css } from './stylish.js'

const className = css([cssC, wrapper])

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
        color: this.active ? 'red' : wrapper.color,
        fontSize: this.active ? '3em' : wrapper.fontSize,
        '&:hover': {
          color: this.active ? 'blue' : 'yellow',
        }
      }, className)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
