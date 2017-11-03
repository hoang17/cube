<template lang="pug">
  div(:class="$style.sidebar")
    Expansion
      Expand(:title="cube.name" expand)
        component(:cube="cube", :is="cube.type + '-pane'" @keydown.native.enter.stop="")
      Expand(title="Font")
        FieldSet
          FontSelect(lb="Font Family" v-model="rule.fontFamily" :ph="cs.fontFamily")
        FieldSet
          SliderField(lb="Font Size", v-model="rule.fontSize" min="0" max="80" step="0.01" subfix="px" :default="cs.fontSize")
        FieldSet
          SliderField(lb="Line Height", v-model="rule.lineHeight" min="0" max="120" step="0.01" subfix="px" :default="cs.lineHeight")
        FieldSet
          SliderField(lb="Letter Spacing", v-model="rule.letterSpacing" min="-1" max="3" step="0.01" subfix="rem" default="0")
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
        FieldSet
          ColorPicker(lb="Color" ph="rgba(0,0,0,.87)" v-model='rule.color')
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
      Expand(title="Display" v-if="canDisplay")
        FieldSet
          Label(:w="1/3") Display
          Select(:w="2/3" v-model='rule.display')
            option(value="") --
            option(value="block") block
            //- option(value="inline") Inline
            option(value="inline-block") inline block
            option(value="flex") flex
            option(value="inline-flex") inline flex
        FieldSet(v-if="['Container','Block','Text'].includes(cube.name)")
          Label(:w="1/3") Overflow
          Select(:w="2/3" v-model='rule.overflow')
            option(value="") --
            option(value="auto") auto
            option(value="scroll") scroll
            option(value="hidden") hidden
        FieldSet
          Label(:w="1/3") Transition
          Input(:w="2/3" :ph="cs.transition" v-model='rule.transform')
        FieldSet
          Label(:w="1/3") Transform
          Input(:w="2/3" :ph="cs.transform" v-model='rule.transform')
        FieldSet
          SliderField(lb="Rotate", v-model="rotate" min="-180" max="180" step="0.01" default="0")
        FieldSet
          SliderField(lb="Opacity", v-model="rule.opacity" min="0" max="1" step="0.01" default="1")
      Expand(title="Dimension")
        div(v-if="rule.display!='inline'")
          FieldSet
            SliderField(lb="Width", v-model="rule.width" min="0" max="1000" step="0.01" subfix="px" :default="cs.width")
          FieldSet
            SliderField(lb="Height", v-model="rule.height" min="0" max="1000" step="0.01" subfix="px" :default="cs.height")
        div(v-if="rule.display!='inline' && ['Container','Block','Form','Text'].includes(cube.name)")
          FieldSet
            SliderField(lb="Max Width", v-model="rule.maxWidth" min="0" max="100" step="0.01" subfix="px" :default="cs.maxWidth")
          FieldSet
            SliderField(lb="Max Height", v-model="rule.maxHeight" min="0" max="100" step="0.01" subfix="px" :default="cs.maxHeight")
          FieldSet
            SliderField(lb="Min Width", v-model="rule.minWidth" min="0" max="100" step="0.01" subfix="px" :default="cs.minWidth")
          FieldSet
            SliderField(lb="Min Height", v-model="rule.minHeight" min="0" max="100" step="0.01" subfix="px" :default="cs.minHeight")
      Expand(title="Layout" v-if="canLayout")
        FieldSet
          SliderField(lb="Magin Left", v-model="rule.marginLeft" min="0" max="100" step="0.01" subfix="px" :default="cs.marginLeft")
        FieldSet
          SliderField(lb="Magin Right", v-model="rule.marginRight" min="0" max="100" step="0.01" subfix="px" :default="cs.marginRight")
        FieldSet
          SliderField(lb="Magin Top", v-model="rule.marginTop" min="0" max="100" step="0.01" subfix="px" :default="cs.marginTop")
        FieldSet
          SliderField(lb="Magin Bottom", v-model="rule.marginBottom" min="0" max="100" step="0.01" subfix="px" :default="cs.marginBottom")
        hr(:class="$style.line")
        FieldSet
          SliderField(lb="Padding Left", v-model="rule.paddingLeft" min="0" max="100" step="0.01" subfix="px" :default="cs.paddingLeft")
        FieldSet
          SliderField(lb="Padding Right", v-model="rule.paddingRight" min="0" max="100" step="0.01" subfix="px" :default="cs.paddingRight")
        FieldSet
          SliderField(lb="Padding Top", v-model="rule.paddingTop" min="0" max="100" step="0.01" subfix="px" :default="cs.paddingTop")
        FieldSet
          SliderField(lb="Padding Bottom", v-model="rule.paddingBottom" min="0" max="100" step="0.01" subfix="px" :default="cs.paddingBottom")
        //- FieldSet
          Label(:w="1/3") Padding
          Input(:w="2/3" ph="Margin" v-model='rule.margin')
        //- FieldSet
          Label(:w="1/3") Padding
          Input(:w="2/3" ph="Padding" v-model='rule.padding')
      Expand(title="Flex" v-if="canFlex")
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
      Expand(title="Flex Item" v-if="canFlexItem")
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
      Expand(title="Background")
        Background(:rule="rule" :cs="cs")
      Expand(title="Border" v-if="canBorder")
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
          SliderField(lb="Width", v-model="rule.borderWidth" min="0" max="20" step="0.01" subfix="px" :default="cs.borderWidth")
          //-Field(lb="Width" v-model='rule.borderWidth')
          //-Field(:w="1/3" lb="Radius" v-model='rule.borderRadius')
        FieldSet
          SliderField(lb="Radius", v-model="rule.borderRadius" min="0" max="200" step="0.01" subfix="px" :default="cs.borderRadius")
        FieldSet
          ColorPicker(lb="Color" v-model='rule.borderColor' :ph='cs.borderColor')
      Expand(title="Box Shadow" v-if="canBoxShadow")
        BoxShadow(v-model='rule.boxShadow')
      Expand(title="Position" v-if="canPostion")
        FieldSet
          Label(:w="1/3") Position
          Select(:w="2/3" lb="Position" v-model='rule.position')
            option(value="") --
            option(value="static") static
            option(value="absolute") absolute
            option(value="relative") relative
            option(value="fixed") fixed
            option(value="sticky") sticky
        FieldSet
          Field(:w="1/4" lb="Top" v-model='rule.top')
          Field(:w="1/4" lb="Bottom" v-model='rule.bottom')
          Field(:w="1/4" lb="Left" v-model='rule.left')
          Field(:w="1/4" lb="Right" v-model='rule.right')
      Expand(title="Hover" v-if="canHover")
        FieldSet
          ColorPicker(lb="Color" v-model="hover.color")
        FieldSet
          ColorPicker(lb="Background Color" v-model="hover.backgroundColor")
        FieldSet
          ColorPicker(lb="Border Color" v-model="hover.borderColor")
        FieldSet
          Field(lb="Background Style" v-model='hover.background')
        FieldSet
          Field(lb="Box Shadow" v-model='hover.boxShadow')
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
import BoxShadow from './BoxShadow'

export default {
  props: ['cube','fonts','parent'],
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
    BoxShadow,
  },
  data () {
    return {
      cubeCss: null,
    }
  },
  computed: {
    canDisplay(){
      return true
    },
    canLayout(){
      return true
    },
    canFlex(){
      return this.rule.display == 'flex'
    },
    canFlexItem(){
      return this.parent && this.parentRule.display == 'flex'
    },
    canBorder(){
      return ['Container','Block','Form','Button','Text','Photo'].includes(this.cube.name)
    },
    canBoxShadow(){
      return ['Container','Block','Form','Button','Text','Photo'].includes(this.cube.name)
    },
    canPostion(){
      return ['Container','Block','Photo'].includes(this.cube.name)
    },
    canHover(){
      return ['Button','Link','Text','Container'].includes(this.cube.name)
    },
    ...mapGetters([
      'page',
      'styleCount'
    ]),
    ...mapState([
      'user',
      'cubes',
      'activeElement',
    ]),
    hover(){
      if (!this.rule['&:hover'])
        this.$set(this.rule, '&:hover', { color: null, backgroundColor: null, borderColor: null, background: null, boxShadow: null })
      return this.rule['&:hover']
    },
    rule(){
      return this.style ? this.style.style : this.cube.style
    },
    parentRule(){
      return this.parentStyle ? this.parentStyle.style : this.parent.style
    },
    style(){
      return this.cubes[this.cube.src]
    },
    parentStyle(){
      return this.cubes[this.parent.src]
    },
    cs() {
      return this.activeElement ? window.getComputedStyle(this.activeElement) : this.rule
    },
    font(){
      return this.cs.fontFamily
    },
    rotate: {
      get(){
        if (!this.rule.transform) return
        return parseFloat(this.rule.transform.substring(7))
      },
      set(val){
        this.rule.transform = val ? `rotate(${val}deg)` : null
      }
    }
  },
  methods: {
    c(key) {
      console.log(this.cs[key]);
      return this.cs[key]
    }
  }
}
</script>

<style lang="stylus" module>
.sidebar
  position fixed
  top 0
  right 0
  z-index 3
  height 100%
  outline none
  user-select none
  overflow-y auto
  padding-bottom 100px
  will-change transform
  background-color #f5f5f5
  border-left 1px solid #d1d1d1
  transition .3s cubic-bezier(.25,.8,.5,1)

.line
  background-color: rgba(0,0,0,.12)
  border: none
  display: block
  height: 1px
  flex: 1
  width: 100%
  margin: 20px 0
  overflow: visible
</style>
