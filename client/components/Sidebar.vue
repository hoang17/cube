<template lang="pug">
  div(:class="$style.sidebar")
    Expansion
      Expand(title="Properties" expand)
        component(:cube="cube", :is="cube.type + '-pane'" @keydown.native.enter.stop="")
      Expand(title="Text" expand)
        FieldSet
          Field(:w="2/3" lb="Font Family")
          Field(:w="1/3" lb="Font Size")
        FieldSet
          SelectField(:w="1/3" lb="Weight")
            option Light
            option Thin
            option Normal
            option Bold
            option Heavy
          Field(:w="1/3" lb="Line Height" ph="20px")
          Field(:w="1/3" lb="Spacing" ph="normal")
        FieldSet
          Field(:w="2/3" lb="Color")
          ButtonGroup(:w="1/3", lb="Transform")
            Button AA
            Button Aa
            Button aa
        FieldSet
          ButtonGroup(lb="Style")
            ButtonIcon(fa="bold")
            ButtonIcon(fa="italic")
            ButtonIcon(fa="underline")
            ButtonIcon(fa="strikethrough")
        FieldSet
          ButtonGroup(lb="Alignment")
            ButtonIcon(fa="align-left")
            ButtonIcon(fa="align-center")
            ButtonIcon(fa="align-right")
            ButtonIcon(fa="align-justify")
      Expand(title="Background")
        FieldSet
          Field(:w="1/2" lb="Color")
          Field(:w="1/2" lb="Gradient")
        FieldSet
          SelectField(lb="Select Image")
            option Light
            option Thin
            option Normal
            option Bold
            option Heavy
        FieldSet
          SelectField(:w="1/3" lb="Position")
            option Position
          SelectField(:w="1/3" lb="Repeat")
            option Repeat
          SelectField(:w="1/3" lb="Size")
            option Size
      Expand(title="Layout")
        FieldSet
          Label(:w="2/8" css="margin:0") Display
          Select(:w="6/8" lb="Display")
            option --
            option Block
            option Inline
            option Inline Block
            option Flex
            option Inline Flex
        FieldSet
          Label(:w="2/8" css="margin:0") Dimensions
          Input(:w="3/8" ph="Width")
          Input(:w="3/8" ph="Height")
        FieldSet
          Label(:w="2/8" css="margin:0") Magin
          Input(:w="6/8" ph="Margin")
        FieldSet
          Label(:w="2/8" css="margin:0") Padding
          Input(:w="6/8" ph="Padding")
        FieldSet
          Label(:w="2/8" css="margin:0") Transform
          Input(:w="6/8" ph="Transform")
      Expand(title="Border")
        FieldSet
          ButtonGroup(lb="Style")
            Button Solid
            Button Dotted
            Button Dashed
        FieldSet
          ButtonGroup(lb="Sides")
            Button Top
            Button Right
            Button Bottom
            Button Left
        FieldSet
          Field(:w="1/3" lb="Width")
          Field(:w="1/3" lb="Color")
          Field(:w="1/3" lb="Radius")
      Expand(title="Position")
        FieldSet
          Label(:w="2/8" css="margin:0") Position
          Select(:w="6/8" lb="Position")
            option Static
            option Absolute
            option Relative
            option Fixed
            option Sticky
        FieldSet
          Field(:w="1/4" lb="Top")
          Field(:w="1/4" lb="Bottom")
          Field(:w="1/4" lb="Left")
          Field(:w="1/4" lb="Right")
</template>

<script>
import StyleBar from './StyleBar'
// import FontSelect from './FontSelect'
import { bus, Style } from '../data/factory'
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
      'styles',
    ]),
    rule(){
      return this.style ? this.style.style : this.cube.style
    },
    style(){
      return this.styles[this.cube.css]
    },
    styleName(){
      return this.style ? this.style.name : 'inline'
    },
    css(){
      return this.cube.css
    }
  },
  methods: {
    cssFocus(){
      this.cubeCss = this.cube.css
    },
    cssChanged(){
      let css = this.cube.css
      if (css){
        let count = this.page.styles[css]
        this.$set(this.page.styles, css, count ? count+1 : 1)
      }
      if (this.cubeCss){
        let old = this.cubeCss
        if (this.page.styles[old]){
          this.page.styles[old]--
          if (this.page.styles[old] <= 0)
            this.$delete(this.page.styles, old)
        }
      }
    },
    async addStyle(){
      var name = prompt("ADD NEW STYLE\n\nPlease enter style name", "style name")
      if (name) {
        let style = Style(name)
        style.style = this.cube.style
        style.uid = this.user._id
        await this.$store.dispatch('addStyle', style)
        this.cube.css = style._id
        console.log('style created');
        bus.$emit('watchStyle', style)

        let count = this.page.styles[style._id]
        this.$set(this.page.styles, style._id, count ? count+1 : 1)
      }
    },
    async removeStyle(){
      if (!this.style) return

      let count = this.styleCount(this.style)
      if (count > 1){
        alert(`Can not delete this style because ${count} cubes are using it`)
      }
      else if (this.style && confirm('Do you want to delete this style?')){
        this.$delete(this.page.styles, this.cube.css)
        await this.$store.dispatch('removeStyle', this.style)
        this.cube.css = null
      }
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
