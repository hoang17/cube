<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'

// **********
//   Glamor
// **********

import { css } from 'glamor'

const className = css(cssC.extend, cssC).toString()

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
