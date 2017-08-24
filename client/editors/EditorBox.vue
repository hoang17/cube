<template lang="pug">
  .cube.editbox.elevation-0
    .action
      v-btn(primary, dark, @click="done") Done
      v-btn(light, @click="remove") Remove
    .list
      component(:cube="cube", :is="cube.type + '-editor'")
</template>

<script>
// import { saveCube, removeCube } from '../api'

export default {
  props: ['cube'],
  data() {
    return {
      // active: false,
    }
  },
  methods: {
    async done(){
      // let d = await saveCube(this.cube)
      // if (!this.cube._id)
      //   this.cube._id = d._id
      this.cube.active = false
      this.$emit('done')
    },
    async remove(){
      // if (this.cube._id)
      //   removeCube(this.cube._id)
      this.cube.active = false
      this.$emit('remove')
    }
  },
}
</script>

<style lang="stylus">
.editbox
  position absolute
  z-index 3
  top 0
  right 0
  height 100%
  width 28em
  pointer-events auto
  will-change transform
  user-select none
  transition .3s cubic-bezier(.25,.8,.25,1);
  border-left 1px solid rgba(0,0,0,0.12)

  .input-group__details
    min-height auto

  .input-group
    padding 16px 0 4px 0
    label
      font-size 14px !important
  .input-group--text-field
    input
      font-size 14px !important
  .input-group--text-field
    textarea
      font-size 14px !important

.action
  position fixed
  bottom 0
  width 100%
  z-index 4
  background-color #fff
  padding 10px 0
  border-top: 1px solid rgba(0,0,0,.12)
  background-color #f2f3f5

.list
  overflow-y auto
  pointer-events auto
  height 100%
  padding-bottom 20px

</style>
