<template lang="pug">
  div(:class="$style.sidebar")
    Expansion
      Expand(:title="cube.name" expand)
        component(:cube="cube", :is="cube.type + '-pane'" @keydown.native.enter.stop="")
      Expand(title="Font" expand)
        FieldSet
          FontSelect(lb="Font Family" ph="inherit" v-model="rule.fontFamily")
        FieldSet
          SliderField(lb="Font Size", v-model="rule.fontSize" min="0" max="10" step="0.01" subfix="em")
        FieldSet
          SliderField(lb="Line Height", v-model="rule.lineHeight" min="0" max="5" step="0.01")
        FieldSet
          SliderField(lb="Letter Spacing", v-model="rule.letterSpacing" min="-1" max="3" step="0.01" subfix="rem")
        FieldSet
          SelectField(:w="1/2" lb="Weight" v-model='rule.fontWeight')
            option(value="") inherit
            option(value="200") Light
            option(value="300") Thin
            option(value="400") Normal
            option(value="500") Thick
            option(value="600") Heavy
            option(value="bold") Bold
          ButtonGroup(:w="1/2", lb="Transform")
            ButtonIcon(value="uppercase" v-model='rule.textTransform') AA
            ButtonIcon(value="capitalize" v-model='rule.textTransform') Aa
            ButtonIcon(value="lowercase" v-model='rule.textTransform') aa
          //-Field(:w="1/2" lb="Line Height" ph="1.5" v-model='rule.lineHeight')
          //-Field(:w="1/3" lb="Spacing" ph="normal" v-model='rule.letterSpacing')
        FieldSet
          ColorPicker(lb="Color" ph="rgba(0,0,0,.87)" v-model='rule.color')
        FieldSet
          ColorPicker(lb="Background Color" v-model='rule.backgroundColor')
        FieldSet
          ButtonGroup(lb="Style")
            ButtonIcon(fa="bold" value="bold" v-model='rule.fontWeight')
            ButtonIcon(fa="italic" value="italic" v-model='rule.fontStyle')
            ButtonIcon(fa="underline" value="underline" v-model='rule.textDecoration')
            ButtonIcon(fa="strikethrough" value="line-through" v-model='rule.textDecoration')
        FieldSet
          ButtonGroup(lb="Alignment" )
            ButtonIcon(fa="align-left" value="left" v-model='rule.textAlign')
            ButtonIcon(fa="align-center" value="center" v-model='rule.textAlign')
            ButtonIcon(fa="align-right" value="right" v-model='rule.textAlign')
            ButtonIcon(fa="align-justify" value="justify" v-model='rule.textAlign')
      //-Expand(title="Background")
        Background(:rule="rule")
      Expand(title="Layout")
        FieldSet
          Label(:w="1/3") Display
          Select(:w="2/3" v-model='rule.display')
            option(value="") --
            option(value="block") Block
            option(value="inline") Inline
            option(value="inline-block") Inline Block
            option(value="flex") Flex
            option(value="inline-flex") Inline Flex
        FieldSet
          SliderField(lb="Width", v-model="rule.width" min="0" max="100" step="0.01" subfix="rem")
        FieldSet
          SliderField(lb="Height", v-model="rule.height" min="0" max="100" step="0.01" subfix="rem")
        FieldSet
          SliderField(lb="Max Width", v-model="rule.maxWidth" min="0" max="100" step="0.01" subfix="rem")
        FieldSet
          SliderField(lb="Max Height", v-model="rule.maxHeight" min="0" max="100" step="0.01" subfix="rem")
        FieldSet
          SliderField(lb="Min Width", v-model="rule.minWidth" min="0" max="100" step="0.01" subfix="rem")
        FieldSet
          SliderField(lb="Min Height", v-model="rule.minHeight" min="0" max="100" step="0.01" subfix="rem")
        //-FieldSet
          Label(:w="1/3") Dimensions
          Input(:w="1/3" ph="Width" v-model='rule.width')
          Input(:w="1/3" ph="Height" v-model='rule.height')
        //-FieldSet
          Label(:w="1/3") Max
          Input(:w="1/3" ph="Width" v-model='rule.maxWidth')
          Input(:w="1/3" ph="Height" v-model='rule.maxHeight')
        //-FieldSet
          Label(:w="1/3") Min
          Input(:w="1/3" ph="Width" v-model='rule.minWidth')
          Input(:w="1/3" ph="Height" v-model='rule.minHeight')
        FieldSet
          Label(:w="1/3") Magin
          Input(:w="2/3" ph="Margin" v-model='rule.margin')
        FieldSet
          Label(:w="1/3") Padding
          Input(:w="2/3" ph="Padding" v-model='rule.padding')
        FieldSet
          Label(:w="1/3") Transform
          Input(:w="2/3" ph="Transform" v-model='rule.transform')
      Expand(title="Flex Box Container")
        FieldSet
          Label(:w="1/3") Flex Direction
          Select(:w="2/3" v-model='rule.flexDirection')
            option(value="row") Row
            option(value="row-reverse") Row Reverse
            option(value="column") Column
            option(value="column-reverse") Column Reverse
        FieldSet
          Label(:w="1/3") Flex Wrap
          Select(:w="2/3" v-model='rule.flexWrap')
            option(value="nowrap") No Wrap
            option(value="wrap") Wrap
            option(value="wrap-reverse") Wrap Reverse
        FieldSet
          Label(:w="1/3") Justify Content
          Select(:w="2/3" v-model='rule.justifyContent')
            option(value="flex-start") Flex Start
            option(value="flex-end") Flex End
            option(value="center") Center
            option(value="space-between") Space Between
            option(value="space-around") Space Around
        FieldSet
          Label(:w="1/3") Align Items
          Select(:w="2/3" v-model='rule.alignItems')
            option(value="flex-start") Flex Start
            option(value="flex-end") Flex End
            option(value="center") Center
            option(value="baseline") Baseline
            option(value="stretch") Stretch
        FieldSet
          Label(:w="1/3") Align Content
          Select(:w="2/3" v-model='rule.alignContent')
            option(value="flex-start") Flex Start
            option(value="flex-end") Flex End
            option(value="center") Center
            option(value="space-between") Space Between
            option(value="space-around") Space Around
            option(value="stretch") Stretch
      Expand(title="Flex Box Item")
        FieldSet
          Label(:w="1/3") Order
          Input(:w="2/3" ph="Order" v-model='rule.order')
        FieldSet
          Label(:w="1/3") Flex
          Input(:w="2/3" ph="Flex" v-model='rule.flex')
        FieldSet
          Label(:w="1/3") Align Self
          Select(:w="2/3" v-model='rule.alignSelf')
            option(value="auto") Auto
            option(value="flex-start") Flex Start
            option(value="flex-end") Flex End
            option(value="center") Center
            option(value="baseline") Baseline
            option(value="stretch") Stretch
      Expand(title="Border")
        FieldSet
          ButtonGroup(lb="Style")
            ButtonIcon(value="solid" v-model='rule.borderStyle') Solid
            ButtonIcon(value="dotted" v-model='rule.borderStyle') Dotted
            ButtonIcon(value="dashed" v-model='rule.borderStyle') Dashed
        //-FieldSet
          ButtonGroup(lb="Sides" v-model='rule.borderSides')
            ButtonIcon Top
            ButtonIcon Right
            ButtonIcon Bottom
            ButtonIcon Left
        FieldSet
          SliderField(lb="Width", v-model="rule.borderWidth" min="0" max="1" step="0.01" subfix="rem")
          //-Field(lb="Width" v-model='rule.borderWidth')
          //-Field(:w="1/3" lb="Radius" v-model='rule.borderRadius')
        FieldSet
          SliderField(lb="Radius", v-model="rule.borderRadius" min="0" max="5" step="0.01" subfix="rem")
        FieldSet
          ColorPicker(lb="Color" v-model='rule.borderColor')
      Expand(title="Position")
        FieldSet
          Label(:w="1/3") Position
          Select(:w="2/3" lb="Position" v-model='rule.position')
            option(value="") --
            option(value="static") Static
            option(value="absolute") Absolute
            option(value="relative") Relative
            option(value="fixed") Fixed
            option(value="sticky") Sticky
        FieldSet
          Field(:w="1/4" lb="Top" v-model='rule.top')
          Field(:w="1/4" lb="Bottom" v-model='rule.bottom')
          Field(:w="1/4" lb="Left" v-model='rule.left')
          Field(:w="1/4" lb="Right" v-model='rule.right')
</template>

<script>
import FontSelect from './FontSelect'
import { mapState, mapGetters } from 'vuex'
import Expand from './Expand'
import Expansion from './Expansion'
import FieldSet from './FieldSet'
import Field from './Field'
import Select from './Select'
import SelectField from './SelectField'
import ButtonGroup from './ButtonGroup'
import ButtonIcon from './ButtonIcon'
import Input from './Input'
import Label from './Label'
import Background from './Background'
import ColorPicker from './ColorPicker'
import SliderField from './SliderField'

export default {
  props: ['cube'],
  components: {
    FontSelect,
    Expand,
    Expansion,
    FieldSet,
    Field,
    SelectField,
    Select,
    ButtonGroup,
    ButtonIcon,
    Input,
    Label,
    Background,
    ColorPicker,
    SliderField,
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
      'activeElement',
    ]),
    rule(){
      return this.style ? this.style.style : this.cube.style
    },
    style(){
      return this.cubes[this.cube.src]
    },
    font(){
      let font = this.activeElement ? window.getComputedStyle(this.activeElement).getPropertyValue('font-family') : 'inherit'
      console.log(font);
      return font
    }
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
