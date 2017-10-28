<template lang="pug">
  div(:class="className" @click="active=!active") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

import { sheet, css } from './stylish.js'

const className = css(cssC, wrapper)

export default {
  data(){
    return {
      className,
      active: false,
    }
  },
  watch: {
    active(){
      sheet.update({
        color: this.active ? 'red' : 'blue'
      })
    }
  }
}
</script>

<style lang="stylus" module>
</style>
