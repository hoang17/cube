<template lang="pug">
  v-toolbar(dense)
    v-btn(icon, @click='save')
      v-icon save
    v-btn(icon, @click="dup()")
      v-icon content_copy
    v-btn(icon, @click='trash()')
      v-icon delete
    v-btn(icon, @click="undo()", :disabled="!canUndo")
      v-icon undo
    v-btn(icon, @click="redo()", :disabled="!canRedo")
      v-icon redo
    a(:href="url", target='_blank', rel='noopener')
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
import { cloneDeep }  from 'lodash'
import { ObjectId } from '../api'

export default {
  props: ['cube'],
  computed: {
    url(){
      return this.page.url.startsWith('/') ? this.page.url : '//'+this.page.url
    },
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
    trash(){
      if (confirm("Do you want to delete this page?")) {
        this.$store.dispatch('deletePage', { page: this.page })
        this.activeCube = null
        this.$router.push({ name: 'build' })
        return
      }
    },
    dup(){
      let p = cloneDeep(this.page)
      p._id = ObjectId()
      p.new = true
      p.content += ' Copy'
      p.path = p._id
      p.url = p.host + '/' + p._id
      this.$store.commit('setPage', p)
      this.activeCube = p
      this.$router.push({ name: 'build', params: { id: p._id }})
    },
    snapshot(page) {
      let h = this.history
      h.index++
      h.stack.splice(h.index)
      h.stack.push(cloneDeep(page))
    },
    undo() {
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index--
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    redo() {
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index++
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    startWatch(){
      this.stopWatch = this.$store.watch(this.$store.getters.pageState, (page, old) => {
        if (page._id == old._id || this.history.index == -1)
          this.snapshot(page)
      }, {deep: true})
    },
    async save(){
      // this.activeCube = null
      this.page.userId = this.$store.state.user._id
      let id = await this.$store.dispatch('savePage')
      console.log('saved');
      this.$router.push({ name: 'build', params: { id: id }})
    }
  },
  mounted() {
    this.snapshot(this.page)
    this.startWatch()
    document.addEventListener("keydown", e => {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
        e.preventDefault()
        this.save()
      }
    }, false)
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
