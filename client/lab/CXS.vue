<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC } from './styles'

// **********
//   cxs
// **********

import cxs from 'cxs'

const className = cxs(cssC.extend, cssC)

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
