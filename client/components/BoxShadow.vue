<template lang="pug">
  div
    FieldSet
      Field(
        lb="Box Shadow"
        :value="value")
    FieldSet
      SliderField(
        lb="Horizontal Length"
        v-model="hor"
        min="-50" max="50"
        step="1"
        subfix="px")
    FieldSet
      SliderField(
        lb="Vertical Length"
        v-model="ver"
        min="-50" max="50"
        step="1"
        subfix="px")
    FieldSet
      SliderField(
        lb="Blur Radius"
        v-model="blur"
        min="0" max="100"
        step="1"
        subfix="px")
    FieldSet
      SliderField(
        lb="Spread Radius"
        v-model="spread"
        min="-50" max="50"
        step="1"
        subfix="px")
    FieldSet
      ColorPicker(lb="Color" v-model='color')
    FieldSet
      toggle-button(
        v-model="inset"
        color="#82C7EB"
        :value="false"
        :sync="true"
        :labels="true")
</template>

<script>
import FieldSet from './FieldSet'
import Field from './Field'
import SliderField from './SliderField'
import ColorPicker from './ColorPicker'

export default {
  props: ['w','lb','ph','value'],
  components: {
    FieldSet, Field, SliderField, ColorPicker
  },
  data(){
    return {
      hor: 0,
      ver: 0,
      blur: 0,
      spread: 0,
      color: null,
      inset: false
    }
  },
  computed: {
    boxShadow(){
      return `${this.hor} ${this.ver} ${this.blur} ${this.spread} ${this.color}`.trim()
    }
  },
  watch:{
    boxShadow(val){
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
