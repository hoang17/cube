<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'
import * as allStyles from './styles'

import { createStyles, css } from './stylish.js'

const styles = createStyles(allStyles)

const className = css(styles.cssC, styles.wrapper)

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
