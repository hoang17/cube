<template lang="pug">
  v-toolbar(dense)
    v-btn(icon, @click='save', :disabled="saved")
      v-icon save
    v-btn(icon, @click="dup")
      v-icon content_copy
    v-btn(icon, @click='trash', :disabled="blank")
      v-icon delete
    v-btn(icon, @click="undo", :disabled="!canUndo")
      v-icon undo
    v-btn(icon, @click="redo", :disabled="!canRedo")
      v-icon redo
    a(:href="url", target='_blank', rel='noopener', v-show="page._id!=newId")
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
import { ObjectId, NanoId, NanoSlug } from '../data/factory'
import cloneDeep  from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'

export default {
  // props: ['cube'],
  data() {
    return {
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
  computed: {
    saved(){
      return this.history.sid == this.page.sid
    },
    url(){
      return this.page.url.startsWith('/') ? this.page.url : '//'+this.page.url
    },
    histories(){
      return this.$store.state.histories
    },
    history(){
      return this.histories[this.$store.state.pageId]
    },
    page(){
      return this.$store.getters.page
    },
    newId(){
      return this.$store.state.newId
    },
    blank(){
      return this.page._id == this.newId && this.history.stack.length < 2
    },
    canUndo(){
      return this.history.index > 0
    },
    canRedo(){
      return this.history.stack.length - 1 > this.history.index
    },
    cubes: {
      get() {
        return this.page.cubes
      },
      set(cubes) {
        this.$store.commit('setCubes', cubes)
      }
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
  methods: {
    snapshot(page) {
      let h = this.histories[page._id]
      h.index++
      this.stopWatch()
      page.sid = NanoId()
      this.startWatch()
      h.stack.splice(h.index)
      h.stack.push(cloneDeep(page))
    },
    undo() {
      if (!this.canUndo) return
      this.stopWatch()
      let h = this.history
      h.index--
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.activeCube = this.page
      this.startWatch()
      this.autoSavePage(this.page)
    },
    redo() {
      if (!this.canRedo) return
      this.stopWatch()
      let h = this.history
      h.index++
      this.$store.commit('setPage', cloneDeep(h.stack[h.index]))
      this.activeCube = this.page
      this.startWatch()
      this.autoSavePage(this.page)
    },
    async save(){
      if (this.saved) return

      if (this.page._id == this.newId){
        await this.$store.dispatch('addPage')
        this.stopWatch()
        this.$store.commit('addNewPage')
        this.startWatch()
        this.history.sid = this.page.sid
        this.$router.push({ name: 'build', params: { id: this.page._id }})
        console.log('page created');
      }
      else {
        await this.$store.dispatch('updatePage', this.page)
        this.history.sid = this.page.sid
        console.log('page updated');
      }
    },
    async savePage(page){
      // if saved return
      if (this.histories[page._id].sid == this.page.sid) return

      if (page._id == this.newId){
        console.log('page changed');
      } else {
        await this.$store.dispatch('updatePage', page)
        this.history.sid = page.sid
        console.log('page updated');
      }
    },
    startWatch(){
      this.stopWatch = this.$store.watch(() => this.$store.state.pages, () => {
        this.takeSnapshot(this.page)
      }, {deep: true})
    },
    stopWatch: () => {},
    takeSnapshot: debounce(function(page) {
      this.snapshot(page)
      this.savePage(page)
    }, 500),
    autoSavePage: debounce(function(page) {
      this.savePage(page)
    }, 500),
    copy(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      this.clipboard = cloneDeep(this.activeCube)
      console.log('copied');
    },
    cut(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      this.clipboard = cloneDeep(this.activeCube)
      this.removeActiveCube()
      console.log('cut');
    },
    paste(){
      if (!this.activeCube || !this.clipboard) return
      let c = cloneDeep(this.clipboard)
      if (this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.cubes.push(c)
      }
      console.log('pasted');
    },
    async dup(){
      if (this.activeCube == this.page) {
        let p = cloneDeep(this.page)
        p._id = ObjectId()
        p.content += ' Copy'
        p.path = NanoSlug()
        p.url = p.host + '/' + p.path
        this.stopWatch()
        this.$store.commit('setNewPage', p)
        this.startWatch()
        this.activeCube = p
        this.$router.push({ name: 'build', params: { id: p._id }})
        await this.$store.dispatch('addPage')
      }
      else this.cubes.push(cloneDeep(this.activeCube))
    },
    trash(){
      // remove page
      if (this.activeCube == this.page) {
        if (!confirm("Do you want to delete this page?")) return
        this.stopWatch()
        this.$store.dispatch('deletePage', { page: this.page })
        this.startWatch()
        this.$router.push({ name: 'build' })
      }
      else this.removeActiveCube()
    },
    removeActiveCube(){
      var remove = cubes => {
        let index = cubes.indexOf(this.activeCube)
        if (index > -1){
          cubes.splice(index, 1)
          this.activeCube = this.page
        } else {
          cubes.map(c => {
            if (c.cubes && c.cubes.length > 0)
              remove(c.cubes)
          })
        }
      }
      remove(this.cubes)
    },
  },
  mounted() {
    this.startWatch()

    document.addEventListener('keydown', e => {
      // if (window.event) e =  event
      var metaKey = navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey

      if (e.keyCode == 8 || e.keyCode == 46)
        this.trash()
      else if (e.keyCode == 90 && e.shiftKey && metaKey) {
        e.preventDefault()
        // console.log("⌘+⌃+z")
        this.redo()
      }
      else if (e.keyCode == 90 && metaKey) {
        e.preventDefault()
        // console.log("⌘+z")
        this.undo()
      }
      else if (e.keyCode == 83 && metaKey){
        e.preventDefault()
        // console.log("⌘+s")
        this.save()
      }
      else if (e.keyCode == 67 && metaKey)
        this.copy()
      else if (e.keyCode == 68 && metaKey){
        this.dup()
        e.preventDefault()
      }
      else if (e.keyCode == 86 && metaKey)
        this.paste()
      else if (e.keyCode == 88 && metaKey)
        this.cut()

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
