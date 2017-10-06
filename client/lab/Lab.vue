<template lang="pug">
  Wrapper
    ToolBarLab(:pr="sideWidth")
    NavBarLab
    PropBarLab
    CanvasLab
      StyledTitle(primary) hello
</template>

<script>
// import styled from '../../../../Lab/vue-styled-components/src'
import styled from '../../node_modules/vue-styled-components-fork/src'
import ToolBarLab from './ToolBarLab'

const sideWidth = '28em'

const Wrapper = styled.div`
  text-align: center
  background: papayawhip
`
const StyledTitle = styled('h1', { primary: Boolean })`
  font-size: ${props => props.primary ? '3em' : '1.5em'}
  color: ${props => props.primary ? 'palevioletred': 'white'}
  background: ${props => props.primary ? 'papayawhip': 'palevioletred'}
  &:hover {
    cursor: pointer
    color: lightblue
  }
`
const NavBarLab = styled.aside`
  position: fixed
  transition: .3s cubic-bezier(.25,.8,.5,1)
  width: 300px
  top: 0
  left: 0
  will-change: transform
  z-index: 3
  height: 100%
  background:rgba(255,255,255,0.8)
`
const PropBarLab = styled.aside`
  position: fixed
  transition: .3s cubic-bezier(.25,.8,.5,1)
  width: ${sideWidth}
  top: 0
  right: 0
  will-change: transform
  z-index: 3
  height: 100%
  background:rgba(255,255,255,0.8)
`
const CanvasLab = styled.main`
  border: 1px solid orange
  padding: 48px ${sideWidth} 0 300px
  min-height: 100vh
  height: 100%
  outline: none
  transition: margin 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  will-change: margin-left
`

export default {
  components: {
    Wrapper,
    StyledTitle,
    ToolBarLab,
    NavBarLab,
    PropBarLab,
    CanvasLab
  },
  data(){
    return {
      sideWidth
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
