<template lang="pug">
  div(:class="className") Testing
</template>

<script>
import { cssC, wrapper } from './styles'

// ********
//   FELA
// ********

import { createRenderer, combineRules as compose } from 'fela'
import extend from 'fela-plugin-extend'
// import customProperty from 'fela-plugin-custom-property'
// import embedded from 'fela-plugin-embedded'
// import friendlyPseudoClass from 'fela-plugin-friendly-pseudo-class'
// import namedMediaQuery from 'fela-plugin-named-media-query'
// import LVHA from 'fela-plugin-lvha'
// import placeholderPrefixer from 'fela-plugin-placeholder-prefixer'
// import unit from 'fela-plugin-unit'

import { render } from 'fela-dom'

const renderer = createRenderer({
  plugins: [
    extend(),
    // customProperty(),
    // embedded(),
    // friendlyPseudoClass(),
    // namedMediaQuery(),
    // LVHA(),
    // placeholderPrefixer()
    // unit(),
  ]
})

const className = renderer.renderRule(compose(() => cssC, () => wrapper))

// const className = renderer.renderRule(combineRules(() => cssB, () => cssC))

if (process.env.VUE_ENV === 'client')
  render(renderer)

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
