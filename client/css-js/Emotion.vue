<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'

// **********
//   Emotion
// **********

import { css } from 'emotion'

const className = css(cssC.extend, cssC)

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
