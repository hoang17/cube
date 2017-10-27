<template lang="pug">
div
  div(:class="wrapper")
    div(:class="cssEmotion") Testing
  div(:class="wrapper")
    div(:class="cssFela") Testing
  div(:class="wrapper")
    div(:class="cssJSS") Testing
</template>

<script>
import color from 'color'

// **********
//   Emotion
// **********

import { css as ss } from 'emotion'
import { lighten, modularScale, hiDPI } from 'polished'

const wrapper = ss`
  height:10em
  border:1px solid lightblue
`

const emotionClass = {
  color: 'red',
  backgroundColor: 'lightblue'
}

const cssA = {
  ...emotionClass,
  // extend: emotionClass,
  color: lighten(0.2, '#000'),
  fontSize: modularScale(1),
  [hiDPI(1.5)]: {
    fontSize: modularScale(2.5)
  },
  '&:hover': {
    backgroundColor: 'tomato'
  }
}

const cssB = {
  // ...cssA,
  extend: cssA,
  'line-height': '2em',
  'font-size': modularScale(4),
}

const cssC = {
  // ...cssB,
  extend: cssB,
  cursor: 'pointer',
  'padding-left': '5em',
  transition: '.3s cubic-bezier(.25,.8,.5,1)',
  '&:hover': {
    'letter-spacing': '1em',
    'padding-left': '2em',
    'line-height': '3em',
  }
}

const cssEmotion = ss(cssA, cssB, cssC)

// const H1 = ss`
//   ${cssA}
//   line-height: 2em
//   font-size: ${modularScale(4)}
// `
//
// const H2 = ss`
//   ${H1}
//   cursor: pointer
//   padding-left: 5em
//   transition: .3s cubic-bezier(.25,.8,.5,1);
//   &:hover {
//     letter-spacing: 1em
//     padding-left: 2em
//     line-height: 3em
//   }
// `


// ********
//   CXS
// ********
//
// import cxs from 'cxs'
//
// const cxsClass = cxs({
//   color: 'blue',
//   ':hover': {
//     backgroundColor: 'tomato',
//     cursor: 'pointer'
//   }
// })
//
// FAILED
// const cxsClassA = cxs(cssA)

// ********
//   FELA
// ********

import { createRenderer, combineRules } from 'fela'
import { render } from 'fela-dom'

// rules are just plain functions of props
// returning a valid object of style declarations
const rule = props => ({
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  lineHeight: 1.4,
  '&:hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  },
  // nest media queries and pseudo classes
  // inside the style object
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    '&:hover': {
      color: 'tomato'
    }
  }
})

// creates a new renderer to render styles
const renderer = createRenderer()

// const className = renderer.renderRule(rule, { fontSize: 12 })
// const className = renderer.renderRule(() => cssC)
const cssFela = renderer.renderRule(combineRules(() => cssA, () => cssB, () => cssC))

// it uses atomic css design to reuse styles
// on declaration base and to keep the markup minimal
// console.log(className) // => a b c d e f h

// renders all styles into the DOM
if (process.env.VUE_ENV === 'client')
  render(renderer)

// ********
//   JSS
// ********

import jss from 'jss'
import preset from 'jss-preset-default'
import createGenerateClassName from 'jss/lib/utils/createGenerateClassName'

jss.setup({createGenerateClassName, ...preset()})

const styles = {
  button: {
    fontSize: 12,
    background: 'blue',
    color: 'orange',
    '&:hover': {
      background: 'blue',
      color: 'tomato'
    }
  },
  ctaButton: {
    extend: 'button',
    // extend: 'button',
    // composes: '$button',
    '&:hover': {
      background: color('blue').darken(0.3).hex(),
      cursor: 'pointer'
    }
  },
  '@media (min-width: 1024px)': {
    button: {
      width: 200
    }
  }
}

const styl = { cssA, cssB, cssC }

// const { classes } = jss.createStyleSheet(styles).attach()
const { classes } = jss.createStyleSheet(styl).attach()
const cssJSS = classes.cssC


// **********
//   Glamor
// **********
//
// import { css } from 'glamor'
//
// let rules = css({
//   color: 'red',
//   ':hover': {
//     color: 'pink'
//   },
//   '@media(min-width: 300px)': {
//     color: 'green',
//     ':hover': {
//       color: 'yellow'
//     }
//   }
// })
//
// let mono = css({
//   fontFamily: 'monospace'
// })
//
// let bolder = css({
//   fontWeight: 'bolder'
// })


export default {
  components: {
    // Button
  },
  data(){
    return {
      wrapper,
      cssEmotion,
      cssFela,
      cssJSS
      // myStyle: className // rules.toString() // css(mono, bolder).toString()
    }
  }
}
</script>

<style lang="stylus" module>
</style>
