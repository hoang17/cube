<template lang="pug">
  v-toolbar(dense)
    v-btn(icon, @click='save', :disabled="saved")
      v-icon save
    v-btn(icon, @click="dup")
      v-icon content_copy
    v-btn(icon, @click='remove')
      v-icon delete
    v-btn(icon, @click="undo", :disabled="!canUndo")
      v-icon undo
    v-btn(icon, @click="redo", :disabled="!canRedo")
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
import cloneDeep  from 'lodash/cloneDeep'
import { nanoid } from '../data/factory'

export default {
  props: ['cube'],
  computed: {
    saved(){
      return !this.history.sid || this.history.sid == this.page.sid
    },
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
      stopWatch: () => {},
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
    remove(){
      this.$emit('remove')
    },
    dup(){
      this.$emit('dup')
    },
    snapshot(page) {
      let h = this.history
      h.index++

      if (h.index == 0){
        h.sid = page.sid
      } else {
        this.stopWatch()
        page.sid = nanoid(10)
        this.startWatch()
      }
      // h.saved = h.index == 0

      h.stack.splice(h.index)
      h.stack.push(cloneDeep(page))
    },
    undo() {
      if (!this.canUndo) return
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index--
      // h.saved = false
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    redo() {
      if (!this.canRedo) return
      this.stopWatch()
      this.activeCube = null
      let h = this.history
      h.index++
      // h.saved = false
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.startWatch()
    },
    startWatch(){
      this.stopWatch = this.$store.watch(this.$store.getters.pageState, (page, old) => {
        if (page._id == old._id || this.history.index == -1){
          this.snapshot(page)
        }
      }, {deep: true})
    },
    async save(){
      if (this.saved) return
      // this.activeCube = null
      let id = await this.$store.dispatch('savePage')
      this.history.sid = this.page.sid
      this.$router.push({ name: 'build', params: { id: id }})
      console.log('saved');
      // this.history.saved = true
    },
  },
  mounted() {
    this.snapshot(this.page)
    this.startWatch()

    document.addEventListener('keydown', e => {
      // if (window.event) e =  event
      var metaKey = (e) => navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey

      if (e.keyCode == 90 && e.shiftKey && metaKey(e)) {
        e.preventDefault()
        // console.log("⌘+⌃+z")
        this.redo()
      }
      else if (e.keyCode == 90 && metaKey(e)) {
        e.preventDefault()
        // console.log("⌘+z")
        this.undo()
      }
      else if (e.keyCode == 83 && metaKey(e)){
        e.preventDefault()
        // console.log("⌘+s")
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

  .btn
  .btn__content
  .icon
    transition none

  .icon
    font-size 20px

  .btn-toggle--selected
    box-shadow none

</style>
