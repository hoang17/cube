<template lang="pug">
  div(:class="$style.sidebar")
    Expansion
      Expand(:title="cube.name" expand)
        component(:cube="cube", :is="cube.type + '-pane'" @keydown.native.enter.stop="")
      Expand(title="Font" expand)
        FieldSet
          Field(:w="2/3" lb="Font Family" ph="inherit" v-model="rule.fontFamily")
          Field(:w="1/3" lb="Font Size" ph="14px" v-model='rule.fontSize')
        FieldSet
          SelectField(:w="1/3" lb="Weight" v-model='rule.fontWeight')
            option(value="200") Light
            option(value="300") Thin
            option(value="400") Normal
            option(value="500") Bold
            option(value="600") Heavy
          Field(:w="1/3" lb="Line Height" ph="1.5" v-model='rule.lineHeight')
          Field(:w="1/3" lb="Spacing" ph="normal" v-model='rule.letterSpacing')
        FieldSet
          Field(:w="2/3" lb="Color" ph="rgba(0,0,0,.87)" v-model='rule.color')
          ButtonGroup(:w="1/3", lb="Transform" v-model='rule.textTransform')
            Button AA
            Button Aa
            Button aa
        FieldSet
          ButtonGroup(lb="Style" v-model='rule.textStyle')
            ButtonIcon(fa="bold")
            ButtonIcon(fa="italic")
            ButtonIcon(fa="underline")
            ButtonIcon(fa="strikethrough")
        FieldSet
          ButtonGroup(lb="Alignment" v-model='rule.textAlign')
            ButtonIcon(fa="align-left")
            ButtonIcon(fa="align-center")
            ButtonIcon(fa="align-right")
            ButtonIcon(fa="align-justify")
      Expand(title="Background")
        FieldSet
          Field(:w="1/2" lb="Color" v-model='rule.backgroundColor')
          Field(:w="1/2" lb="Gradient")
        FieldSet
          SelectField(lb="Select Image" v-model='rule.backgroundImg')
            option Light
            option Thin
            option Normal
            option Bold
            option Heavy
        FieldSet
          SelectField(:w="1/3" lb="Position" v-model='rule.backgroundPosition')
            option Position
          SelectField(:w="1/3" lb="Repeat" v-model='rule.backgroundRepeat')
            option Repeat
          SelectField(:w="1/3" lb="Size" v-model='rule.backgroundSize')
            option Size
      Expand(title="Layout")
        FieldSet
          Label(:w="2/8") Display
          Select(:w="6/8" lb="Display" v-model='rule.display')
            option --
            option Block
            option Inline
            option Inline Block
            option Flex
            option Inline Flex
        FieldSet
          Label(:w="2/8") Dimensions
          Input(:w="3/8" ph="Width" v-model='rule.width')
          Input(:w="3/8" ph="Height" v-model='rule.height')
        FieldSet
          Label(:w="2/8") Magin
          Input(:w="6/8" ph="Margin" v-model='rule.margin')
        FieldSet
          Label(:w="2/8") Padding
          Input(:w="6/8" ph="Padding" v-model='rule.padding')
        FieldSet
          Label(:w="2/8") Transform
          Input(:w="6/8" ph="Transform" v-model='rule.transform')
      Expand(title="Border")
        FieldSet
          ButtonGroup(lb="Style" v-model='rule.borderStyle')
            Button Solid
            Button Dotted
            Button Dashed
        FieldSet
          ButtonGroup(lb="Sides" v-model='rule.borderSides')
            Button Top
            Button Right
            Button Bottom
            Button Left
        FieldSet
          Field(:w="1/3" lb="Width" v-model='rule.borderWidth')
          Field(:w="1/3" lb="Color" v-model='rule.borderColor')
          Field(:w="1/3" lb="Radius" v-model='rule.borderRadius')
      Expand(title="Position")
        FieldSet
          Label(:w="2/8") Position
          Select(:w="6/8" lb="Position" v-model='rule.position')
            option Static
            option Absolute
            option Relative
            option Fixed
            option Sticky
        FieldSet
          Field(:w="1/4" lb="Top" v-model='rule.top')
          Field(:w="1/4" lb="Bottom" v-model='rule.bottom')
          Field(:w="1/4" lb="Left" v-model='rule.left')
          Field(:w="1/4" lb="Right" v-model='rule.right')
</template>

<script>
import StyleBar from './StyleBar'
// import FontSelect from './FontSelect'
import { bus } from '../data/factory'
import debounce from 'lodash/debounce'
import { mapState, mapGetters } from 'vuex'
import Expand from './Expand'
import Expansion from './Expansion'
import FieldSet from './FieldSet'
import Field from './Field'
import Select from './Select'
import SelectField from './SelectField'
import ButtonGroup from './ButtonGroup'
import ButtonIcon from './ButtonIcon'
import Button from './Button'
import Input from './Input'
import Label from './Label'

export default {
  props: ['cube'],
  components: {
    StyleBar,
    // FontSelect
    Expand,
    Expansion,
    FieldSet,
    Field,
    SelectField,
    Select,
    ButtonGroup,
    ButtonIcon,
    Button,
    Input,
    Label,
  },
  data () {
    return {
      cubeCss: null,
    }
  },
  computed: {
    ...mapGetters([
      'page',
      'styleCount'
    ]),
    ...mapState([
      'user',
      'cubes',
    ]),
    rule(){
      return this.style ? this.style.style : this.cube.style
    },
    style(){
      return this.cubes[this.cube.src]
    },
  },
}
</script>

<style lang="stylus" module>
.sidebar
  position: fixed
  top: 0
  right: 0
  z-index: 3
  height: 100%
  outline none
  user-select none
  overflow-y: auto
  padding-bottom: 100px
  will-change: transform
  background-color: #f5f5f5;
  border-left: 1px solid #d1d1d1;
  transition: .3s cubic-bezier(.25,.8,.5,1)
</style>
