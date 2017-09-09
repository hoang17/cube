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
import { ObjectId, NanoId, NanoSlug, Clipboard } from '../data/factory'
import cloneDeep  from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'

export default {
  // props: ['cube'],
  data() {
    return {
      sw: null // stopWatch handler
      // clipboard: null,
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
    style(){
      return this.$store.state.styles[this.activeCube.css]
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
      this.savePage(this.page)
    },
    async savePage(page){
      // if saved return
      if (this.histories[page._id].sid == this.page.sid) return

      if (page._id == this.newId){
        await this.$store.dispatch('addPage', page)
        this.stopWatch()
        this.$store.commit('addNewPage')
        this.startWatch()
        this.history.sid = page.sid
        this.$router.push({ name: 'build', params: { id: page._id }})
        console.log('page created');
      } else {
        await this.$store.dispatch('updatePage', page)
        this.history.sid = page.sid
        console.log('page updated');
      }
    },
    startWatch(){
      if (this.sw) return
      this.sw = this.$store.watch(() => this.$store.state.pages, () => {
        this.takeSnapshot(this.page)
      }, {deep: true})
    },
    stopWatch(){
      if (!this.sw) return
      this.sw()
      this.sw = null
    },
    takeSnapshot: debounce(function(page) {
      this.snapshot(page)
      this.savePage(page)
    }, 500),
    autoSavePage: debounce(function(page) {
      this.savePage(page)
    }, 500),
    // copy(){
    //   if (!this.activeCube || this.activeCube.name == 'Page') return
    //   this.clipboard = Clipboard(cloneDeep(this.activeCube))
    //   console.log('copied');
    // },
    // cut(){
    //   if (!this.activeCube || this.activeCube.name == 'Page') return
    //   this.clipboard = Clipboard(cloneDeep(this.activeCube))
    //   this.removeActiveCube()
    //   console.log('cut');
    // },
    // paste(){
    //   if (!this.activeCube || !this.clipboard) return
    //   let c = cloneDeep(this.clipboard.cube)
    //   if (this.activeCube.cubes){
    //     this.activeCube.cubes.push(c)
    //   } else {
    //     this.cubes.push(c)
    //   }
    //   console.log('pasted');
    // },
    async dupPage(p){
      p._id = ObjectId()
      p.content += ' Copy'
      p.path = NanoSlug()
      p.host = this.$store.state.host
      p.url = p.host + '/' + p.path
      this.stopWatch()
      this.$store.commit('setNewPage', p)
      this.startWatch()
      this.activeCube = p
      this.$router.push({ name: 'build', params: { id: p._id }})
      await this.$store.dispatch('addPage', p)
    },
    async dup(){
      if (this.activeCube == this.page) {
        let p = cloneDeep(this.page)
        await this.dupPage(p)
        // p._id = ObjectId()
        // p.content += ' Copy'
        // p.path = NanoSlug()
        // p.url = p.host + '/' + p.path
        // this.stopWatch()
        // this.$store.commit('setNewPage', p)
        // this.startWatch()
        // this.activeCube = p
        // this.$router.push({ name: 'build', params: { id: p._id }})
        // await this.$store.dispatch('addPage', p)
      }
      else this.cubes.push(cloneDeep(this.activeCube))
    },
    trash(){
      if (!this.activeCube) return
      // remove page
      if (this.activeCube == this.page) {
        if (!confirm("Do you want to delete this page?")) return
        this.stopWatch()
        this.$store.dispatch('deletePage', this.page)
        this.startWatch()
        this.$router.push({ name: 'build' })
      }
      else this.removeActiveCube()
    },
    removeActiveCube(){
      if (this.activeCube.name == 'Page') return
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
    getStyles(cube){
      let styles = {}
      let s = this.$store.state.styles
      if (cube.css && s[cube.css]) styles[cube.css] = s[cube.css]

      var getcss = cubes => {
        if (!cubes) return
        cubes.map(c => {
          if (c.css && s[c.css]) styles[c.css] = s[c.css]
          getcss(c.cubes)
        })
      }
      getcss(cube.cubes)
      return Object.keys(styles).length == 0 ? null : styles
    },
  },
  mounted() {
    if (this.sw) return
    this.startWatch()

    document.addEventListener("copy", (e) => {
      if (!this.activeCube || e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
      e = e || window.event // IE
      let c = Clipboard(this.activeCube, this.getStyles(this.activeCube))
      e.clipboardData.setData("text/plain", JSON.stringify(c))
      e.preventDefault()
      console.log('copied');
    })

    document.addEventListener("cut", (e) => {
      if (!this.activeCube || e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
      e = e || window.event // IE
      let c = Clipboard(this.activeCube, this.getStyles(this.activeCube))
      e.clipboardData.setData("text/plain", JSON.stringify(c))
      this.removeActiveCube()
      e.preventDefault()
      console.log('cut');
    })

    document.addEventListener('paste', (e) => {
      if (!this.activeCube || e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
      try {
        var clipboardData = e.clipboardData || window.clipboardData
        var s = clipboardData.getData('Text')
        var c = JSON.parse(s);
        if (c.styles){
          this.$store.dispatch('addBatchStyles', c.styles)
        }
        // console.log(c);
        if (c.cube.name == 'Page'){
          this.dupPage(c.cube)
        }
        else if (this.activeCube.cubes){
          this.activeCube.cubes.push(c.cube)
        } else {
          this.cubes.push(c.cube)
        }
        console.log('pasted');
      } catch (e) {
        // console.log(e);
      }
    })

    document.addEventListener('keydown', e => {
      e = e || window.event // IE
      var metaKey = navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey

      if (e.keyCode == 8 || e.keyCode == 46){
        e.preventDefault()
        this.trash()
      }
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
      else if (e.keyCode == 68 && metaKey){
        e.preventDefault()
        this.dup()
      }
      // else if (e.keyCode == 67 && metaKey){
      //   this.copy()
      // }
      // else if (e.keyCode == 88 && metaKey){
      //   this.cut()
      // }
      // else if (e.keyCode == 86 && metaKey){
      //   this.paste()
      // }
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
