<template lang="pug">
  div
    FieldSet
      Field(
        lb="Box Shadow"
        :value="value"
        @input="val => $emit('input', val)")
    FieldSet
      SliderField(
        lb="Horizontal Length"
        v-model="box.offsetX"
        min="-50" max="50"
        step="1")
    FieldSet
      SliderField(
        lb="Vertical Length"
        v-model="box.offsetY"
        min="-50" max="50"
        step="1")
    FieldSet
      SliderField(
        lb="Blur Radius"
        v-model="box.blurRadius"
        min="0" max="100"
        step="1")
    FieldSet
      SliderField(
        lb="Spread Radius"
        v-model="box.spreadRadius"
        min="-50" max="50"
        step="1")
    FieldSet
      ColorPicker(lb="Color" v-model='box.color')
    FieldSet
      SwitchField(lb="Inset" v-model='box.inset' id="inset")
</template>

<script>
import FieldSet from './FieldSet'
import Field from './Field'
import SliderField from './SliderField'
import ColorPicker from './ColorPicker'
import SwitchField from './SwitchField'
import { parse, stringify } from '../plugins/css-box-shadow'

const defaultValue = {
  offsetX: 0,
  offsetY: 0,
  blurRadius: 0,
  spreadRadius: 0,
  color: null,
  inset: false
}

export default {
  props: ['w','lb','ph','value'],
  components: {
    FieldSet, Field, SliderField, ColorPicker, SwitchField
  },
  data(){
    return {
      box: defaultValue
    }
  },
  computed: {
    val(){
      let v = stringify([this.box])
      return this.box.offsetX == 0 && this.box.offsetY == 0 ? null : v
    },
    activeCube() {
      return this.$store.state.activeCube
    }
  },
  watch:{
    activeCube(){
      this.box = this.value ? parse(this.value)[0] : defaultValue
    },
    val(val){
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
