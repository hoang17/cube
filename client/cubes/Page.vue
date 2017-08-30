<template lang="pug">
  .canvas(:style="page.style")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
    //-v-layout(row-sm, column, child-flex-sm)
      v-flex(xs12, md4, offset-md4)
</template>

<script>
let home = '599e64ecb66d9f0c26a53523'

export default {
  title(){
    return this.page.content
  },
  asyncData ({ store, route }) {
    if (!route.params.id && !route.meta.id)
      route.params.id = home
    return store.dispatch('fetchPage', { id: route.params.id })
  },
  data() {
    return {
    }
  },
  watch: {
    id(){
      if (this.id != this.page._id)
        this.$store.dispatch('fetchPage', { id: this.id })
    }
  },
  computed: {
    id(){
      return this.$route.params.id ? this.$route.params.id : home
    },
    user(){
      return this.$store.state.user
    },
    page() {
      return this.$store.state.page
    },
    cubes() {
      return this.$store.getters.cubes
    },
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  /*background-color #fff*/

  .cube
    position relative
    margin 10px auto
    text-align center
    padding 10px
    transition .3s cubic-bezier(.25,.8,.25,1)

@media (max-width: 1024px)
  .container
    display block !important
    /*flex-direction column !important*/

</style>
