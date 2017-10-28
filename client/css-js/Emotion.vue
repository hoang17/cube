<template lang="pug">
  div(:class="className" @click="active=!active") Testing
</template>

<script>
import { cssC, wrapperFunc } from './styles'

import { css } from 'emotion'

// const className = css(cssC.extend, cssC, wrapper)

export default {
  data(){
    return {
      className: null,
      active: false,
    }
  },
  watch: {
    active(){
      const wrapper = wrapperFunc({
        color: this.active ? 'yellow' : 'blue'
      })
      this.className = css(cssC.extend, cssC, wrapper)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
