<template lang="pug">
  div
    FieldSet
      Field(lb="Background Style" v-model='rule.background' :ph="cs.background")
    //- FieldSet
      SelectField(lb="Style" v-model='rule.backgroundStyle')
        option(value="color") Color
        option(value="gradient") Gradient
        option(value="image") Image
        option(value="video") Video
    FieldSet
      ColorPicker(lb="Background Color" v-model='rule.backgroundColor')
    FieldSet
      Field(lb="Background Image" v-model='bgImg' ph="URL")
    FieldSet
      SelectField(:w="1/3" lb="Position" v-model='rule.backgroundPosition')
        option(value='center') Center
        option(value='top') Top
        option(value='bottom') Bottom
        option(value='left') Left
        option(value='right') Right
        option(value='top left') Top Left
        option(value='top right') Top right
        option(value='bottom left') Bottom Left
        option(value='bottom right') Bottom Right
      SelectField(:w="1/3" lb="Repeat" v-model='rule.backgroundRepeat')
        option(value='no-repeat') Off
        option(value='repeat-x') Horizontally
        option(value='repeat-y') Vertically
        option(value='repeat') Both
        option(value='space') Space
        option(value='round') Round
      SelectField(:w="1/3" lb="Attachment" v-model='rule.backgroundAttachment')
        option(value='scroll') Scroll
        option(value='fixed') Fixed
        option(value='local') Local
      //- InputSelectField(:w="1/3" lb="Size" v-model='rule.backgroundSize')
        option(value='cover') Cover
        option(value='contain') Contain
        option(value='100% 100%') Stretch
        option(value='custom') Custom
    FieldSet
      Field(lb="Size" v-model='rule.backgroundSize')
</template>
<script>
import Field from './Field'
import FieldSet from './FieldSet'
import SelectField from './SelectField'
import ColorPicker from './ColorPicker'
import parseCssUrls from 'css-url-parser'

export default {
  props:['rule'],
  components: {
    Field, FieldSet, SelectField, ColorPicker
  },
  computed: {
    cs() {
      return this.activeElement ? window.getComputedStyle(this.activeElement) : this.rule
    },
    activeElement(){
      return this.$store.state.activeElement
    },
    bgImg:{
      get(){
        return this.rule.backgroundImage ? parseCssUrls(this.rule.backgroundImage)[0] : ''
      },
      set(val){
        this.rule.backgroundImage = `url(${val})`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
