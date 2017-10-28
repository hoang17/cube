<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

import { css } from './stylish.js'

const className = css(cssC, wrapper)

export default {
  data(){
    return {
      className,
    }
  }
}
</script>

<style lang="stylus" module>
</style>
