<template lang="pug">
  v-toolbar(dense)
    v-btn(icon, @click='save')
      v-icon save
    v-btn(icon)
      v-icon undo
    v-btn(icon)
      v-icon redo
    a(:href="'/view/'+page._id", target='_blank', rel='noopener')
      v-btn(icon)
        v-icon visibility
    //-.text-format(v-if="cube")
      v-btn-toggle(v-bind:items='toggle_options', v-model='toggle_exclusive')
      v-btn-toggle(v-bind:items='toggle_options_multiple', multiple, v-model='toggle_multiple')
    //-v-btn(icon)
      v-icon help
    //-v-btn(icon)
      v-icon refresh
    //-v-btn(icon)
      v-icon schedule
    //-v-btn(icon)
      v-icon search
</template>

<script>

export default {
  props: ['cube'],
  computed: {
    page(){
      return this.$store.state.page
    },
  },
  data() {
    return {
      toggle_exclusive: 2,
      toggle_multiple: [],
      toggle_options: [
        // { icon: 'save', value: 0 },
        // { icon: 'undo', value: 11 },
        // { icon: 'redo', value: 22 },
        { icon: 'format_align_left', value: 1 },
        { icon: 'format_align_center', value: 2 },
        { icon: 'format_align_right', value: 3 },
        { icon: 'format_align_justify', value: 4 },
      ],
      toggle_options_multiple: [
        { icon: 'format_bold', value: 1 },
        { icon: 'format_italic', value: 2 },
        { icon: 'format_underlined', value: 3 },
        { icon: 'format_color_fill', value: 4 }
      ],
    }
  },
  methods: {
    async save(){
      if (this.$store.state.activeCube){
        this.$store.state.activeCube.active = false
        this.$store.state.activeCube = null
      }
      this.page.userId = this.$store.state.user._id
      await this.$store.dispatch('savePage')
      this.$router.push({ name: 'build', params: { id: this.page._id }})
    }
  },
}
</script>

<style lang="stylus">
.toolbar
  margin-left 300px
  margin-right 28em
  z-index 5
  pointer-events auto
  box-shadow none
  width auto

  .icon
    font-size 20px

  .btn-toggle--selected
    box-shadow none

</style>
