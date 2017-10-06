<template lang="pug">
  ToolBarLab(:pr="pr")
    ToolBarInside
      slot
</template>

<script>
import styled from '../../node_modules/vue-styled-components-fork/src'

const ToolBarLab = styled.nav`
  width: 100%
  position: fixed
  background-color: palevioletred
  transition: .3s cubic-bezier(.25,.8,.5,1)
  will-change: padding-left
  padding-left: 300px
  padding-right: ${props => props.pr}
  opacity: .5
`
const ToolBarInside = styled.div`
  background-color: orange
  height: 48px
`

export default {
  components: {
    ToolBarLab, ToolBarInside
  },
  props: ['pr'],
  data(){
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
