<template lang="pug">
  .cube.util-box.elevation-1
    v-card.elevation-0
      v-card-text
        h1.title Properties
        v-text-field(label='Id', v-model='cube._id')
        v-text-field(label='Content', v-model='cube.content')
        v-text-field(label='Display', v-model='cube.style.display')
        v-text-field(label='Width', v-model='cube.style.width')
        v-text-field(label='Font', v-model='cube.style.fontFamily')
        v-text-field(label='Color', v-model='cube.style.color')
        v-text-field(label='Size', v-model='cube.style.fontSize')
        v-text-field(label='Weight', v-model='cube.style.fontWeight')
        v-text-field(label='Line Height', v-model='cube.style.lineHeight')
        v-text-field(label='Letter Spacing', v-model='cube.style.letterSpacing')
        v-text-field(label='Text Alignment', v-model='cube.style.textAlign')
        v-text-field(label='Text Transform', v-model='cube.style.textTransform')
        v-btn(primary, dark, @click="save") Save
</template>

<script>
import { saveCube } from '../api'

export default {
  props: ['cube'],
  data() {
    return {
      // active: false,
    }
  },
  methods: {
    async save(){
      let d = await saveCube(this.cube)
      if (!this.cube._id)
        this.cube._id = d._id
    }
    // hide () {
    //   this.active = false
    // }
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
