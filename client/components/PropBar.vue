<template lang="pug">
  .propbar
    .action
      //- v-btn(primary, dark, @click="done") Done
      //- v-btn(icon, @click='saveStyle')
      //-   v-icon save
      //- v-btn(icon, @click="remove")
      //-   v-icon delete

    v-expansion-panel(expand)
      v-expansion-panel-content(:value="true")
        div(slot='header') {{ cube.name }}
        //- .action
        //-   v-btn(icon, @click="remove")
        //-     v-icon delete
        v-card
          v-card-text
            component(:cube="cube", :is="cube.type + '-pane'", @keydown.native.enter.stop="")

      v-expansion-panel-content
        div(slot='header') style
          //- v-chip(small, outline, v-if="style") {{ style.name }}
          //- v-chip(small, outline) inline
        v-card
          v-card-text
            //- v-chip.primary.white--text inline
            //- v-chip.secondary.white--text header
            //- v-chip.red.white--text text
            //- v-chip.green.white--text sub-text
            v-chip(small, outline, v-if="style") {{ style.name }}
            v-chip(small, outline) inline
            v-chip.green.white--text(small, @click="addStyle") + add new style

            select(v-model="cube.css")
              option(selected, :value="undefined") inline
              option(v-for='s in styles', :value="s._id") {{ s.name }}
      v-expansion-panel-content
        //- div(slot='header') {{ styleName }} style
        div(slot='header')
          v-chip(small, outline)  {{ styleName }}
        .action
          v-btn(icon, @click='saveStyle')
            v-icon save
          v-btn(icon, @click="removeStyle")
            v-icon delete
        v-card
          v-card-text.pt-0
            style-bar(:item="style", :rule="rule", @keydown.native.enter.stop="")
</template>

<script>
import StyleBar from './StyleBar'
import { newStyle } from '../data/factory'

export default {
  props: ['cube'],
  components: {
    StyleBar
  },
  data () {
    return {
    }
  },
  computed: {
    rule(){
      return this.style ? this.style.style : this.cube.style
    },
    styles(){
      return this.$store.state.styles
    },
    style(){
      return this.styles[this.cube.css]
    },
    styleName(){
      return this.style ? this.style.name : 'inline'
    },
  },
  methods: {
    async done(){
      this.$emit('done')
    },
    async remove(){
      this.$emit('remove')
    },
    async addStyle(){
      var name = prompt("Please enter new style name", "style name")
      if (name) {
        let style = newStyle(name)
        await this.$store.dispatch('addNewStyle', style)
        this.cube.css = style._id
        console.log('style created');
      }
    },
    async saveStyle(){
      console.log('saveStyle');
      if (this.style){
        await this.$store.dispatch('saveStyle', this.style)
        console.log('style saved');
      } else {
        await this.$store.dispatch('savePage')
        console.log('page saved');
      }
    },
    async removeStyle(){
      if (this.style){
        await this.$store.dispatch('removeStyle', this.style)
        this.cube.css = undefined
      }
    }
  },
}
</script>

<style lang="stylus">
.propbar
  position absolute
  z-index 3
  top 0
  right 0
  height 100%
  width 28em
  pointer-events auto
  will-change transform
  user-select none
  transition .3s cubic-bezier(.25,.8,.25,1)
  border-left 1px solid rgba(0,0,0,0.12)
  text-align center
  overflow auto

  .action
    width 100%
    height 48px
    text-align left
    background-color #fafafa
    box-shadow inset 0 -10px 5px -10px rgba(0,0,0,.1)

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

  .icon
    font-size 20px

  select
    margin 10px auto

  .chip--small
    height 20px
    font-size 12px
    padding 0 8px
    margin 10px 5px 10px 0
    color #424242
    border-color #424242
    text-transform none

  .expansion-panel__header
    text-transform uppercase
    font-weight 500
    padding 0 18px
    // box-shadow 1px -1px 1px 1px rgba(0,0,0,.1)
    // box-shadow 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)

  .expansion-panel__body
    border-top 0.1rem solid #d1d1d1
  //   box-shadow inset 1px 1px 2px rgba(0,0,0,.1)

</style>
