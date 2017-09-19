<template lang="pug">
  v-toolbar.elevation-1(fixed, dense)
    v-toolbar-side-icon(@click.stop="drawer.left=!drawer.left")
    v-btn(icon, @click='save', :disabled="saved")
      i.fa.fa-save
    v-btn(icon, @click='copy', :disabled="!canCopy")
      i.fa.fa-copy
    v-btn(icon, @click='cut', :disabled="!canCut")
      i.fa.fa-cut
    v-btn(icon, @click='paste', :disabled="!canPaste")
      v-icon content_paste
      //- i.fa.fa-paste
    v-btn(icon, @click="dup")
      i.fa.fa-clone
    v-btn(icon, @click='trash', :disabled="!canTrash")
      //- v-icon delete
      i.fa.fa-trash-o
    v-btn(icon, @click="undo", :disabled="!canUndo")
      v-icon.undo undo
    v-btn(icon, @click="redo", :disabled="!canRedo")
      v-icon.redo redo
    a(:href="url", target='_blank', rel='noopener', v-show="page._id!=newId")
      v-btn(icon)
        v-icon visibility
    v-btn(icon, @click="createCube", :disabled="!canCreateCube")
      i.fa.fa-cube
    v-btn(icon, @click="createBlock", :disabled="!canCreateCube")
      i.fa.fa-cubes
      //- v-icon.link link
    v-spacer
    v-toolbar-side-icon(@click.stop="drawer.right=!drawer.right")
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
import { clone, Block, ObjectId, NanoId, NanoSlug, Clipboard } from '../data/factory'
import cloneDeep  from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['drawer'],
  data() {
    return {
      stopWatchHandler: null,
      clipboard: null,
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
    ...mapGetters([
      'page'
    ]),
    ...mapState([
      'newId',
      'pageId',
      'histories',
    ]),
    ...mapState({
      history (state) {
        return this.histories[state.pageId]
      },
      style(state){
        return state.styles[this.activeCube.css]
      },
    }),
    saved(){
      return this.history.sid == this.page.sid
    },
    url(){
      return this.page.url.startsWith('/') ? this.page.url : '//'+this.page.url
    },
    canTrash(){
      return this.pageId != this.newId || this.history.stack.length > 1
    },
    canUndo(){
      return this.history.index > 0
    },
    canRedo(){
      return this.history.stack.length - 1 > this.history.index
    },
    canCreateCube(){
      return this.activeCube && this.activeCube.name != "Page" && this.activeCube.name != "Block" && !this.activeCube.link
    },
    canCopy(){
      return this.activeCube && this.activeCube.name != 'Page'
    },
    canCut(){
      return this.activeCube && this.activeCube.name != 'Page'
    },
    canPaste(){
      return this.activeCube && this.clipboard
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
        return this.$store.state.activeCube
      },
      set(cube){
        this.$store.commit('setActiveCube', cube)
      }
    }
  },
  methods: {
    createBlock(){
      // Create cube
      let cube = clone(this.activeCube)
      // Create block
      let block = Block(cube)
      cube.link = true
      cube.links = [block._id]
      this.$store.dispatch('addCube', cube)
      this.watchCube(cube)
      this.setCube(this.activeCube, block)
    },
    createCube(){
      this.$store.dispatch('addCube', clone(this.activeCube))
    },
    snapshot(page, activeId) {
      let h = this.histories[page._id]
      h.stack[h.index].activeId = activeId
      h.index++
      this.stopWatch()
      page.sid = NanoId()
      this.startWatch()
      h.stack.splice(h.index)
      h.stack.push({ page: cloneDeep(page), activeId: activeId })
    },
    undo() {
      if (!this.canUndo) return
      this.stopWatch()
      let h = this.history
      h.index--
      let snap = h.stack[h.index]
      this.$store.commit('setPage', cloneDeep(snap.page))
      this.activeCube = this.getActiveCube(snap.activeId)
      this.startWatch()
      this.autoSavePage(this.page)
    },
    redo() {
      if (!this.canRedo) return
      this.stopWatch()
      let h = this.history
      h.index++
      let snap = h.stack[h.index]
      this.$store.commit('setPage', cloneDeep(snap.page))
      this.activeCube = this.getActiveCube(snap.activeId)
      this.startWatch()
      this.autoSavePage(this.page)
    },
    getActiveCube(id){
      if (this.page._id == id) return this.page

      var find = cubes => {
        let r = cubes.find(e => e._id == id)
        if (r) return r
        for (let i in cubes){
          let c = cubes[i]
          if (c.cubes && c.cubes.length > 0){
            let cc = find(c.cubes)
            if (cc) return cc
          }
        }
      }
      return find(this.cubes)
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
        // console.log('page updated');
      }
    },
    startWatch(){
      if (this.stopWatchHandler) return
      this.stopWatchHandler = this.$store.watch(() => this.$store.state.pages, () => {
        this.takeSnapshot(this.page, this.activeCube._id)
      }, {deep: true})
    },
    stopWatch(){
      if (this.stopWatchHandler){
        this.stopWatchHandler()
        this.stopWatchHandler = null
      }
    },
    takeSnapshot: debounce(function(page, activeId) {
      this.snapshot(page, activeId)
      this.savePage(page)
    }, 500),
    autoSavePage: debounce(function(page) {
      this.savePage(page)
    }, 500),
    copy(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      let cube = cloneDeep(this.activeCube)
      cube.link = false
      this.clipboard = Clipboard(cube)
      console.log('copied');
    },
    cut(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      this.clipboard = Clipboard(cloneDeep(this.activeCube))
      this.removeActiveCube()
      console.log('cut');
    },
    paste(){
      if (!this.activeCube || !this.clipboard) return
      let c = cloneDeep(this.clipboard.cube)
      if (this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.cubes.push(c)
      }
      console.log('pasted');
    },
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
      else {
        let cube = cloneDeep(this.activeCube)
        cube.link = false
        this.cubes.push(cube)
        console.log('duped');
      }
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
        if (!cubes) return
        let index = cubes.indexOf(this.activeCube)
        if (index > -1){
          cubes.splice(index, 1)
          this.activeCube = this.page
        } else {
          cubes.map(c => {
            if (c.src){
              remove(this.$store.state.cubes[c.src].cubes)
            } else if (c.cubes && c.cubes.length > 0)
              remove(c.cubes)
          })
        }
      }
      remove(this.cubes)
    },
    setCube(cube, newCube){
      if (this.activeCube.name == 'Page') return
      var set = cubes => {
        let index = cubes.indexOf(cube)
        if (index > -1){
          this.$set(cubes, index, newCube)
          this.activeCube = newCube
        } else {
          cubes.map(c => {
            if (c.cubes && c.cubes.length > 0)
              set(c.cubes)
            // if (c.src){
            //   set(this.$store.state.cubes[c.src].cubes)
            // } else if (c.cubes && c.cubes.length > 0)
            //   set(c.cubes)
          })
        }
      }
      set(this.cubes)
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
    getCubes(cube){
      let blocks = {}
      let s = this.$store.state.cubes
      let id = cube.src
      if (id && s[id]) blocks[id] = s[id]

      var getBlocks = cubes => {
        if (!cubes) return
        cubes.map(c => {
          let i = c.src
          if (i && s[i]) blocks[i] = s[i]
          getBlocks(c.cubes)
        })
      }
      getBlocks(cube.cubes)
      return Object.keys(blocks).length == 0 ? null : blocks
    },
    cubeChanged: debounce(function(val) {
      this.saveCube(val)
    }, 500),
    startCubesWatch(){
      let c = this.$store.state.cubes
      for (let i in c){
        this.watchCube(c[i])
      }
    },
    watchCube(cube){
      this.$store.watch(() => cube, (val, old) => {
        this.cubeChanged(val)
      }, {deep: true})
    },
    async saveCube(cube){
      await this.$store.dispatch('updateCube', cube)
      console.log('cube saved');
    },
  },
  mounted() {
    if (this.stopWatchHandler) return

    this.startWatch()
    this.startCubesWatch()

    document.addEventListener("copy", (e) => {
      if (!this.activeCube || e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
      e = e || window.event // IE
      let c = Clipboard(this.activeCube, this.getStyles(this.activeCube), this.getCubes(this.activeCube))
      // console.log(c);
      e.clipboardData.setData("text/plain", JSON.stringify(c))
      e.preventDefault()
      console.log('copied');
    })

    document.addEventListener("cut", (e) => {
      if (!this.activeCube || e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
      e = e || window.event // IE
      let c = Clipboard(this.activeCube, this.getStyles(this.activeCube), this.getCubes(this.activeCube))
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
          this.$store.dispatch('addStyles', c.styles)
        }
        if (c.cubes){
          this.$store.dispatch('addCubes', c.cubes)
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

<style lang="stylus" scoped>
.toolbar
  z-index 1
  pointer-events auto
  // box-shadow inset 0 -10px 5px -10px #666

  .btn
  .btn__content
  .icon
    transition none

  i
    font-size 18px
    &.fa-clone
    &.fa-copy
      font-size 16px
    &.undo
    &.redo
    &.link
      font-size 20px

  .btn-toggle--selected
    box-shadow none
</style>
