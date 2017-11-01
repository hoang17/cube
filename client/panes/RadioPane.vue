<template lang="pug">
  div
    FieldSet
      Field(lb='Name' v-model='cube.content')
    Box
      Label(top) Options
      draggable(v-model='cube.options')
        FieldSet(v-for="option,i in cube.options" :key="i")
          i(:class="$style.handle")
          Input(v-model='option.name' ph='Option Name')
          Input(v-model='option.value' ph='Option Value')
          i.fa.fa-trash-o(@click="trash(option)")
      Button(:class="$style.button" @click="add") Add
        i.fa.fa-plus
</template>

<script>
import Draggable from 'vuedraggable'
import Field from '../components/Field'
import FieldSet from '../components/FieldSet'
import Input from '../components/Input'
import Label from '../components/Label'
import Box from '../components/Box'
import Button from '../components/Button'
export default {
  props: ['cube'],
  components: {
    Field, FieldSet, Input, Label, Box, Draggable
  },
  methods: {
    add() {
      this.cube.options.push({ value:'', name:'' })
    },
    trash(opt){
      this.$delete(this.cube.options, this.cube.options.indexOf(opt))
    }
  }
}
</script>

<style lang="stylus" module>
.button
  margin-top 10px
  outline none
  cursor pointer
  border-radius: 2px
  background-color #fafafa
  border: 1px solid rgba(0,0,0,.15)
  &:hover
    color #363636
    border-color #b5b5b5
    background-color #e6e6e6
  i
    opacity .8
    margin-left 5px
.handle
  position: relative
  top: 1px
  display: block
  width: 24px
  height: 11px
  opacity: .25
  margin-right: 10px
  background: linear-gradient(180deg,#000,#000 20%,#fff 0,#fff 40%,#000 0,#000 60%,#fff 0,#fff 80%,#000 0,#000)
.box
  i
    cursor pointer
</style>
