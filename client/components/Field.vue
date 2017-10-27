<template lang="pug">
  Box(:w='w')
    Label(:class="myStyle" top) {{ lb }}
    Input(
      :ph="ph"
      type="text"
      :readonly="readonly"
      :value="value"
      @input="val => $emit('input', val)"
      @change.native="e => $emit('change', e.target.value)")
</template>

<script>
import { css } from 'emotion'
import cxs from 'cxs'
import { createRenderer } from 'fela'
import { render } from 'fela-dom'

const myStyle = css`
  color: red
`

const cxsClass = cxs({
  color: 'blue',
  ':hover': {
    color: 'tomato'
  }
})

// rules are just plain functions of props
// returning a valid object of style declarations
const rule = props => ({
  fontSize: props.fontSize + 'px',
  marginTop: props.margin ? '15px' : 0,
  color: 'red',
  lineHeight: 1.4,
  ':hover': {
    color: 'blue',
    fontSize: props.fontSize + 2 + 'px'
  },
  // nest media queries and pseudo classes
  // inside the style object
  '@media (min-height: 300px)': {
    backgroundColor: 'gray',
    ':hover': {
      color: 'black'
    }
  }
})

// creates a new renderer to render styles
const renderer = createRenderer()
// rendering the rule returns a className reference
// which can be attached to any element
const className = renderer.renderRule(rule, { fontSize: 12 })
// it uses atomic css design to reuse styles
// on declaration base and to keep the markup minimal
console.log(className) // => a b c d e f h
// renders all styles into the DOM
render(renderer)


import Box from './Box'
import Input from './Input'
import Label from './Label'
export default {
  props: ['w','lb','ph','value','readonly'],
  components: {
    Box,
    Input,
    Label,
    // Button
  },
  data(){
    return {
      myStyle: cxsClass
    }
  }
}
</script>

<style lang="stylus" module>
</style>
