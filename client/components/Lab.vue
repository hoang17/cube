<template lang="pug">
  Wrapper
    StyledTitle(primary) hello
    .toolbar
    .navbar
    .propbar
    .canvas
</template>

<script>
import styled from '../../../../Lab/vue-styled-components/src'
// import styled from '../../node_modules/vue-styled-components-fork/src'

// Create a <Wrapper> Vue component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em
  text-align: center
  background: papayawhip
`

// Create a <StyledTitle> Vue component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const StyledTitle = styled('h1', { primary: Boolean })`
  font-size: ${props => props.primary ? '3em' : '1.5em'}
  color: ${props => props.primary ? 'palevioletred': 'white'}
  background: ${props => props.primary ? 'papayawhip': 'palevioletred'}
  &:hover {
    cursor: pointer
    color: lightblue
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1)
  }
`

const StyledInput = styled.input`
  font-size: 1.25em
  padding: 0.5em
  margin: 0.5em
  color: palevioletred
  background: papayawhip
  border: none
  border-radius: 3px
  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1)
  }
`

export default {
  components: {
    Wrapper, StyledTitle, StyledInput
  },
  data(){
    return {
      re: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.toolbar
  border 1px solid red
  height 48px
.navbar
  border 1px solid blue
  height 100px
.propbar
  border 1px solid green
  height 100px
.canvas
  border 1px solid orange
  height 200px
</style>
