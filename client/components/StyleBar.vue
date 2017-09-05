<template lang="pug">
  .style-bar
    //- v-btn(icon, @click='saveStyle')
    //-   v-icon save
    select(v-model="cube.css")
      option(selected, :value="undefined") Select style
      option(v-for='s in styles', :value="s._id") {{ s.name }}

    v-text-field(label='Font', v-model='cube.style.fontFamily')
    v-text-field(label='Color', v-model='cube.style.color')
    v-text-field(label='Size', v-model='cube.style.fontSize')
    v-text-field(label='Weight', v-model='cube.style.fontWeight')
    v-text-field(label='Line Height', v-model='cube.style.lineHeight')
    v-text-field(label='Letter Spacing', v-model='cube.style.letterSpacing')
    v-text-field(label='Text Alignment', v-model='cube.style.textAlign')
    v-text-field(label='Text Transform', v-model='cube.style.textTransform')
    v-text-field(label='Width', v-model='cube.style.width')
    v-text-field(label='Display', v-model='cube.style.display')
    v-text-field(label='Margin', v-model='cube.style.margin')
    v-text-field(label='Padding', v-model='cube.style.padding')
</template>

<script>
import insertCss from 'insert-css'
import { genStyle } from '../plugins/helpers'

export default {
  props: ['cube'],
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    styles(){
      return this.$store.state.styles
    },
  },
  mounted() {
    for (let id in this.styles){
      let e = this.styles[id]
      let s = genStyle(e.style)
      let style = `.--${id} {${s}}`
      insertCss(style)
    }
  },
  methods: {
    async saveStyle(){
      let id = await this.$store.dispatch('saveStyle', { name: this.cube.css, style: this.cube.style })
    },
  }
}
</script>

<style lang="stylus" scoped>
.style-bar
  text-align left

  .btn--icon
    width 20px
    height 20px
    .icon
      font-size 20px

</style>
