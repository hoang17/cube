<template lang="pug">
  div(:class="$style.pane")
    div(:class="$style.header", @click="open = !open")
      label(:class="$style.label") {{ title }}
      i(:class="[$style.icon, 'material-icons']", :style="open && 'transform: rotate(-180deg)'") keyboard_arrow_down
    div(:class="[$style.body, ins]", :style="expand ? null : {height:0, display:'none'}", ref="body")
      slot
</template>
<script>
export default {
  props:['expand', 'title', 'inner'],
  data() {
    return {
      open: this.expand,
      height: 'auto',
    }
  },
  computed: {
    ins(){
      if (this.inner) return this.inner
      else return this.$style.inner
    }
  },
  watch: {
    open(){
      this.toggle()
    }
  },
  mounted() {
    let e = this.$refs.body
    e.style = ''
    this.height = e.clientHeight + 1 + 'px'
    if (!this.expand) e.style.display = 'none'
  },
  methods: {
    toggle() {
      let e = this.$refs.body
      if (this.open){
        e.style.display = ''
        e.style.height = 0
        setTimeout(() => e.style.height = this.height, 10)
        setTimeout(() => e.style = '', 300)
      } else {
        e.style.height = this.height
        setTimeout(() => e.style.height = 0, 10)
        setTimeout(() => e.style.display = 'none', 300)
      }
    }
  }
}
</script>
<style lang="stylus" module>
.pane
  width 100%
  outline none
  flex 1 1 100%
  color rgba(0,0,0,.87)
  border-top 1px solid rgba(0,0,0,.12)
  transition .3s cubic-bezier(.25,.8,.5,1)

.label
  font-size 12px
  flex 1 1 auto

.icon
  font-size 20px !important
  color rgba(0,0,0,.54)

.header
  cursor pointer
  text-transform uppercase
  font-weight 500
  height 32px
  display flex
  cursor pointer
  align-items center
  position relative
  padding 10px 24px 10px 15px
  background-color #fafafa

.body
  overflow hidden
  background-color #eee
  border-top 1px solid #d1d1d1
  transition .3s cubic-bezier(.25,.8,.5,1)

.inner
  padding:12px 10px
</style>
