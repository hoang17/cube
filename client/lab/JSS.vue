<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'

// ********
//   JSS
// ********

import jss from 'jss'
import preset from 'jss-preset-default'
import createGenerateClassName from 'jss/lib/utils/createGenerateClassName'

jss.setup({createGenerateClassName, ...preset()})

const styles = { cssC }

const { classes } = jss.createStyleSheet(styles).attach()
const className = classes.cssC

export default {
  data(){
    return {
      className
    }
  }
}
</script>

<style lang="stylus" module>
</style>
