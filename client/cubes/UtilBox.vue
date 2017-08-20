<template lang="pug">
  .cube.util-box.elevation-1(:class="{active: active}", @click="active=!active", v-click-outside="hide")
    v-card.elevation-0
      v-card-text
        h1.title Properties
        v-text-field(label='First name', hint='please enter your first name', persistent-hint, v-model='first', required)
        v-text-field(label='Middle name', hint='example of helper text only on focus', v-model='middle')
        v-text-field(label='Last name', hint='please enter your last name', persistent-hint, v-model='last', required)
        v-text-field(label='Amount', value='10.00', prefix='$')
        v-text-field(label='Weight', value='28.00', suffix='lbs')
        v-text-field(label='Email address', value='example', suffix='@gmail.com')
        v-text-field(label='Label Text', value='12:30:00', type='time', suffix='PST')
        small * required field
</template>

<script>
export default {
  data() {
    return {
      active: false,
      first: '',
      middle: '',
      last: '',
    }
  },
  methods: {
    hide () {
      this.active = false
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube
  position absolute
  z-index 3
  margin 0
  top 0
  right 0
  bottom 0
  width 28em
  overflow-y auto
  transition .3s cubic-bezier(.25,.8,.25,1)
  will-change transform
  user-select none

  /*.cube-slot
    position relative
    cursor pointer
    padding 10px

    &:after
      pointer-events none
      content ''
      display block
      position absolute
      top 0
      left 0
      width 100%
      height 100%*/

    /*&:hover
      &:after
        border 1px dotted #03a9f4 !important*/

  /*&.active > .cube-slot
    &:after
      border 2px solid #81d4fa !important*/

  /*.card
    margin 20px auto*/
</style>
