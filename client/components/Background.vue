<template lang="pug">
  div
    //-FieldSet
      SelectField(lb="Style" v-model='rule.backgroundStyle')
        option(value="color") Color
        option(value="gradient") Gradient
        option(value="image") Image
        option(value="video") Video
    FieldSet
      ColorPicker(lb="Color" v-model='rule.backgroundColor')
    //-FieldSet
      Field(lb="Gradient")
    //-FieldSet
      SelectField(lb="Select Image" v-model='rule.backgroundImg')
        option Light
        option Thin
        option Normal
        option Bold
        option Heavy
    //-FieldSet
      SelectField(:w="1/3" lb="Position" v-model='rule.backgroundPosition')
        option(value='center') Center
        option(value='top-left') Top Left
        option(value='top') Top
        option(value='top-right') Top right
        option(value='right') Right
        option(value='bottom-right') Bottom Right
        option(value='bottom') Bottom
        option(value='bottom-left') Bottom Left
        option(value='left') Left
      SelectField(:w="1/3" lb="Repeat" v-model='rule.backgroundRepeat')
        option(value='off') Off
        option(value='horizontal') Horizontally
        option(value='vertical') Vertically
        option(value='both') Both
      SelectField(:w="1/3" lb="Size" v-model='rule.backgroundSize')
        option(value='fill') Fill
        option(value='fit') Fit
        option(value='stretch') Stretch
        option(value='default') Default
        option(value='custom') Custom
</template>
<script>
import Field from './Field'
import FieldSet from './FieldSet'
import SelectField from './SelectField'
import ColorPicker from './ColorPicker'

export default {
  props:['rule'],
  components: {
    Field, FieldSet, SelectField, ColorPicker
  },
  data(){
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
