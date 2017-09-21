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
    v-btn(icon, @click="toggleBlock", :disabled="!canToggleBlock")
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
import { bus, clone, getCubeStyles, getCubeBlocks, getPageCubes, getPageStyles, Block, ObjectId, NanoId, NanoSlug, Clipboard } from '../data/factory'
import cloneDeep  from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
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
      'styles',
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
      return this.activeCube && this.activeCube.name != "Page" && this.activeCube.name != "Block"
    },
    canToggleBlock(){
      return this.activeCube && this.activeCube.name != "Page" && !this.activeCube.link
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
    toggleBlock(){
      if (this.activeCube.link) return
      if (this.activeCube.name == 'Block'){
        let origin = this.$store.state.cubes[this.activeCube.src]
        let cube = clone(origin)
        cube.link = false
        this.setCube(this.activeCube, cube)

        // UPDATE BLOCKS COUNT
        let i = origin._id
        this.page.blocks[i]--
        if (this.page.blocks[i] <= 0)
          this.$delete(this.page.blocks, i)
        // END UPDATE
      } else {
        // Create cube
        let cube = clone(this.activeCube)
        // Create block
        let block = Block(cube)
        cube.link = true
        this.$store.dispatch('addCube', cube)
        this.watchCube(cube)
        this.setCube(this.activeCube, block)
        // UPDATE BLOCKS COUNT
        // if (!this.page.blocks) this.page.blocks = {}
        this.$set(this.page.blocks, cube._id, 1)
        // END UPDATE
      }
    },
    createCube(){
      let cube = clone(this.activeCube)
      cube.link = false
      this.$store.dispatch('addCube', cube)
    },
    snapshot(page, activeId) {
      let state = this.$store.state
      let cubes = getPageCubes(page, state)
      let styles = getPageStyles(page, state)

      let h = this.histories[page._id]
      let snap = h.stack[h.index]
      snap.activeId = activeId
      if (!isEqual(snap.page, this.page)){
        this.stopWatch()
        page.sid = NanoId()
        this.startWatch()
      }
      h.index++
      h.stack.splice(h.index)
      h.stack.push({ page: cloneDeep(page), activeId: activeId, cubes, styles })
    },
    undo(){
      if (!this.canUndo) return
      let h = this.history
      h.index--
      let snap = h.stack[h.index]
      this.loadSnap(snap)
    },
    redo(){
      if (!this.canRedo) return
      let h = this.history
      h.index++
      let snap = h.stack[h.index]
      this.loadSnap(snap)
    },
    loadSnap(snap){
      if (this.page.sid != snap.page.sid){
        this.stopWatch()
        this.$store.commit('setPage', cloneDeep(snap.page))
        this.startWatch()
        this.autoSavePage(this.page)
      }
      for (let i in snap.cubes){
        if (!isEqual(snap.cubes[i], this.$store.state.cubes[i])){
          let cube = cloneDeep(snap.cubes[i])
          this.$store.commit('setCube', cube)
          this.watchCube(cube)
          this.autoSaveCube(cube)
        }
      }
      for (let i in snap.styles){
        if (!isEqual(snap.styles[i], this.styles[i])){
          let style = cloneDeep(snap.styles[i])
          this.$store.commit('setStyle', style)
          this.watchStyle(style)
          this.autoSaveStyle(style)
        }
      }
      this.activeCube = this.getActiveCube(snap.activeId)
    },
    getActiveCube(id){
      if (this.page._id == id) return this.page

      var find = cubes => {
        if (!cubes) return
        let r = cubes.find(e => e._id == id)
        if (r) return r
        for (let i in cubes){
          let c = cubes[i]
          if (c.src){
            let origin = this.$store.state.cubes[c.src]
            if (origin._id == id)
              return origin
            else {
              let cc = find(origin.cubes)
              if (cc) return cc
            }
          }
          else if (c.cubes && c.cubes.length > 0){
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
        console.log('page updated');
      }
    },
    startWatch(){
      if (this.stopWatchHandler) return
      this.stopWatchHandler = this.$store.watch(() => this.$store.state.pages, () => {
        this.pagesChanged(this.page, this.activeCube._id)
      }, {deep: true})
    },
    stopWatch(){
      if (this.stopWatchHandler){
        this.stopWatchHandler()
        this.stopWatchHandler = null
      }
    },
    pagesChanged: debounce(function(page, activeId) {
      this.snapshot(page, activeId)
      this.savePage(page)
    }, 500),
    autoSavePage: debounce(function(page) {
      this.savePage(page)
    }, 500),
    autoSaveCube: debounce(function(cube) {
      this.saveCube(cube)
    }, 500),
    autoSaveStyle: debounce(function(style) {
      this.saveStyle(style)
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
      let c = clone(this.clipboard.cube)

      // UPDATE STYLES COUNT
      let styles = getCubeStyles(c, this.$store.state.cubes)
      for (let i in styles){
        let count = this.page.styles[i]
        this.$set(this.page.styles, i, count ? count+styles[i] : styles[i])
      }
      // UPDATE BLOCKS COUNT
      let blocks = getCubeBlocks(c)
      for (let i in blocks){
        let count = this.page.blocks[i]
        this.$set(this.page.blocks, i, count ? count+blocks[i] : blocks[i])
      }
      // END UPDATE

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
        let p = clone(this.page)
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
        let cube = clone(this.activeCube)
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
            if (c.src)
              remove(this.$store.state.cubes[c.src].cubes)
            else if (c.cubes && c.cubes.length > 0)
              remove(c.cubes)
          })
        }
      }
      // UPDATE BLOCKS COUNT
      if (this.activeCube.name == "Block"){
        let i = this.activeCube.src
        this.page.blocks[i]--
        if (this.page.blocks[i] <= 0)
          this.$delete(this.page.blocks, i)
      }
      // UPDATE CSS COUNT
      let styles = getCubeStyles(this.activeCube, this.$store.state.cubes)
      // console.log(styles);
      for (let i in styles){
        let count = this.page.styles[i]
        this.$set(this.page.styles, i, count ? count-styles[i] : 0)
        if (this.page.styles[i] <= 0)
          this.$delete(this.page.styles, i)
      }
      // END UPDATE
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
      let ss = this.$store.state.styles
      if (cube.css && ss[cube.css]) styles[cube.css] = ss[cube.css]

      var getcss = cubes => {
        if (!cubes) return
        cubes.map(c => {
          if (c.css && ss[c.css]) styles[c.css] = ss[c.css]

          if (c.src){
            let s = this.$store.state.cubes[c.src]
            if (s.css && ss[s.css]) styles[s.css] = ss[s.css]
            getcss(s.cubes)
          }
          else getcss(c.cubes)
        })
      }

      if (cube.src){
        let s = this.$store.state.cubes[cube.src]
        if (s.css && ss[s.css]) styles[s.css] = ss[s.css]
        getcss(s.cubes)
      }
      else getcss(cube.cubes)
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
      this.snapshot(this.page, this.activeCube._id)
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
      console.log('cube updated');
    },
    styleChanged: debounce(function(val) {
      this.snapshot(this.page, this.activeCube._id)
      this.saveStyle(val)
    }, 500),
    startStylesWatch(){
      for (let i in this.styles){
        this.watchStyle(this.styles[i])
      }
    },
    watchStyle(style){
      this.$store.watch(() => style, (val, old) => {
        this.styleChanged(val)
      }, {deep: true})
    },
    async saveStyle(style){
      await this.$store.dispatch('updateStyle', style)
      console.log('style updated');
    },
  },
  mounted() {
    if (this.stopWatchHandler) return

    this.startWatch()
    this.startCubesWatch()
    this.startStylesWatch()

    bus.$on('watchStyle', style => {
      this.watchStyle(style)
    })

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
        let clipboardData = e.clipboardData || window.clipboardData
        let s = clipboardData.getData('Text')
        let c = JSON.parse(s)
        let cube = clone(c.cube)
        if (c.styles){
          // ADD NEW STYLES TO DB
          this.$store.dispatch('addStyles', c.styles)
        }
        if (c.cubes){
          // ADD NEW CUBES TO DB
          this.$store.dispatch('addCubes', c.cubes)
        }

        // UPDATE STYLES COUNT
        let styles = getCubeStyles(cube, c.cubes)
        for (let i in styles){
          let count = this.page.styles[i]
          this.$set(this.page.styles, i, count ? count+styles[i] : styles[i])
        }

        // UPDATE BLOCKS COUNT
        let blocks = getCubeBlocks(cube)
        for (let i in blocks){
          let count = this.page.blocks[i]
          this.$set(this.page.blocks, i, count ? count+blocks[i] : blocks[i])
        }

        if (cube.name == 'Page'){
          this.dupPage(cube)
        }
        else if (this.activeCube.cubes){
          this.activeCube.cubes.push(cube)
        } else {
          this.cubes.push(cube)
        }
        console.log('pasted');
      } catch (e) {
        console.log(e);
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
