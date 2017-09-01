<template lang="pug">
  v-toolbar(dense)
    v-btn(icon, @click='save')
      v-icon save
    v-btn(icon, @click="dup()")
      v-icon content_copy
    v-btn(icon, @click="undo()", :disabled="!canUndo")
      v-icon undo
    v-btn(icon, @click="redo()", :disabled="!canRedo")
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
import _  from 'lodash'
import { ObjectId } from '../api'

export default {
  props: ['cube'],
  computed: {
    history(){
      return this.$store.getters.history
    },
    page(){
      return this.$store.getters.page
    },
    canUndo(){
      return this.history.index > 0
    },
    canRedo(){
      return this.history.stack.length - 1 > this.history.index
    },
    activeCube:{
      get(){
        return this.$store.getters.activeCube
      },
      set(cube){
        this.$store.commit('setActiveCube', cube)
      }
    }
  },
  data() {
    return {
      stopWatch: undefined,
      // toggle_exclusive: 2,
      // toggle_multiple: [],
      // toggle_options: [
      //   { icon: 'format_align_left', value: 1 },
      //   { icon: 'format_align_center', value: 2 },
      //   { icon: 'format_align_right', value: 3 },
      //   { icon: 'format_align_justify', value: 4 },
      // ],
      // toggle_options_multiple: [
      //   { icon: 'format_bold', value: 1 },
      //   { icon: 'format_italic', value: 2 },
      //   { icon: 'format_underlined', value: 3 },
      //   { icon: 'format_color_fill', value: 4 }
      // ],
    }
  },
  methods: {
    dup(){
      let p = _.cloneDeep(this.page)
      p._id = ObjectId()
      p.new = true
      p.content += ' Copy'
      p.url = '/' + p._id
      this.$store.commit('setPage', p)
      this.activeCube = p
      this.$router.push({ name: 'build', params: { id: p._id }})
    },
    snapshot(page) {
      let h = this.history
      h.index++
      h.stack.splice(h.index)
      h.stack.push(_.cloneDeep(page))
    },
    undo() {
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index--
      this.$store.commit('setPage', _.cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    redo() {
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index++
      this.$store.commit('setPage', _.cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    startWatch(){
      this.stopWatch = this.$store.watch(this.$store.getters.pageState, (page, old) => {
        if (page._id == old._id || this.history.index == -1)
          this.snapshot(page)
      }, {deep: true})
    },
    async save(){
      this.activeCube = null
      this.page.userId = this.$store.state.user._id
      let id = await this.$store.dispatch('savePage')
      this.$router.push({ name: 'build', params: { id: id }})
    }
  },
  mounted () {
    this.snapshot(this.page)
    this.startWatch()
  }
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
