<template lang="pug">
  v-navigation-drawer.propbar(persistent, absolute, overflow, right, enable-resize-watcher, v-model='drawer.right')
    v-expansion-panel(expand)
      v-expansion-panel-content(:value="true")
        div(slot='header') {{ cube.name }}
        v-card
          v-card-text
            component(:cube="cube", :is="cube.type + '-pane'", @keydown.native.enter.stop="")
      v-expansion-panel-content(:value="false")
        div(slot='header') Style
          v-chip(small, outline)  {{ styleName }}
          //- v-chip(small, outline, v-if="style") {{ style.name }}
          //- v-chip(small, outline) inline
        .action
          v-btn(icon, @click="addStyle", title="Add new style")
            i.fa.fa-file-o
          v-btn(icon, @click="removeStyle", title="Delete style", :disabled="!style || styleCount(style) > 1")
            i.fa.fa-trash-o
        v-card
          v-card-text
            //- v-chip.primary.white--text inline
            //- v-chip.secondary.white--text header
            //- v-chip.red.white--text text
            //- v-chip.green.white--text sub-text

            //- v-chip(small, outline, v-if="style") {{ style.name }}
            //- v-chip(small, outline) inline
            //- v-chip.green.white--text(small, @click="addStyle") + add new style

            select(v-model="cube.css", @change="cssChanged", @click="cssFocus")
              option(selected, :value="null") inline
              option(v-for='s in styles', :value="s._id") {{ s.name }} ({{ styleCount(s) }})

            style-bar(:item="style", :rule="rule", @keydown.native.enter.stop="")
      //- v-expansion-panel-content(:value="true")
        div(slot='header') Font
        v-card
          v-card-text
            font-select(:item="style", :rule="rule")
</template>
<script>
import StyleBar from './StyleBar'
import FontSelect from './FontSelect'
import { bus, Style } from '../data/factory'
import debounce from 'lodash/debounce'
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['cube', 'drawer'],
  components: {
    StyleBar, FontSelect
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

<style lang="stylus">
.propbar
  outline none
  user-select none
  text-align center
  // border-left 1px solid rgba(0,0,0,0.12)
  // border-left 1px solid hsla(0,0%,100%,.12)
  // z-index 3
  // pointer-events auto
  // will-change transform
  // transition .3s cubic-bezier(.25,.8,.25,1)

  .action
    width 100%
    height 48px
    text-align left
    // background-color #fafafa
    // box-shadow inset 0 -10px 5px -10px rgba(0,0,0,.1)

  .input-group__details
    min-height auto

  .input-group
    padding 16px 0 2px 0
    label
      font-size 13px !important
      text-transform lowercase
  .input-group--text-field
    input
      font-size 13px !important
  .input-group--text-field
    textarea
      font-size 13px !important

  .input-group--prefix:not(.input-group--focused):not(.input-group--dirty)
    label
      left 8px
      top 15px

  .input-group--prefix .input-group--text-field__prefix
  .input-group--prefix .input-group--text-field__suffix
  .input-group--suffix .input-group--text-field__prefix
  .input-group--suffix .input-group--text-field__suffix
    font-size 13px !important

  .input-group--text-field.input-group--dirty:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line):focus:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea)
    label
      transform translate3d(0,-18px,0) scale(.90)

  .input-group--select
    .input-group__selections__comma
      font-size 13px !important

  .icon
    font-size 20px

  select
    margin 10px auto

  .chip--small
    height 20px
    font-size 12px
    padding 0 8px
    margin -3px 5px 0 8px
    color #424242
    border-color #424242
    text-transform none

  .expansion-panel__header
    text-transform uppercase
    font-weight 500
    padding-left 18px
    height 48px
    // box-shadow 1px -1px 1px 1px rgba(0,0,0,.1)
    // box-shadow 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)

  .expansion-panel__body
    border-top 1px solid hsla(0,0%,100%,.12)


.application--light
  .propbar
    .action
      background-color #fafafa
      box-shadow inset 0 -10px 5px -10px rgba(0,0,0,.1)
    .expansion-panel__body
      border-top 0.1rem solid #d1d1d1
      // box-shadow inset 1px 1px 2px rgba(0,0,0,.1)

.application--dark
  .propbar
    .chip--small
      color #ddd
      border-color #ddd
    .action
      background-color #333
      box-shadow inset 0 -10px 5px -10px #999
</style>
