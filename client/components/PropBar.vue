<template lang="pug">
  .propbar.elevation-0
    .action
      v-btn(primary, dark, @click="done") Done
      v-btn(light, @click="remove") Remove
    v-card.elevation-0
      v-card-text
        h1.title {{ cube.name }}
        .layout
          .flex.xs10
            select(v-model="cube.css")
              option(selected, :value="undefined") Select style
              option(v-for='s in styles', :value="s._id") {{ s.name }}
          .flex.xs2
            v-btn(icon, @click='saveStyle')
              v-icon save
        br
        component.pane(:cube="cube", :is="cube.type + '-pane'")
</template>

<script>
import insertCss from 'insert-css'
import { genStyle } from '../plugins/helpers'

export default {
  props: ['cube'],
  data () {
    return {
      // styles: ['text', 'sub-text','link','header','footer']
    }
  },
  computed: {
    styles(){
      return this.$store.state.styles
    },
  },
  mounted() {
    this.styles.map(e => {
      let s = genStyle(e.style)
      let style = `.--${e._id} {${s}}`
      insertCss(style)
    })
  },
  methods: {
    async saveStyle(){
      let id = await this.$store.dispatch('saveStyle', { name: this.cube.css, style: this.cube.style })
    },
    async done(){
      this.$emit('done')
    },
    async remove(){
      this.$emit('remove')
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

  .btn--icon
    width 20px
    height 20px

.action
  position fixed
  bottom 0
  width 100%
  z-index 4
  background-color #fff
  padding 10px
  border-top: 1px solid rgba(0,0,0,.12)
  background-color #f2f3f5

.pane
  overflow-y auto
  pointer-events auto
  height 100%
  padding-bottom 100px

</style>
