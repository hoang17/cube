<template lang="pug">
  div(:class="className") Testing
</template>

<script>
// import { cssC } from './styles'
import * as styles from './styles'

import { createStyles, css } from './stylish.js'

const { cssC } = createStyles(styles)

const className = css(cssC)

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
