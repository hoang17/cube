<template lang="pug">
  .canvas(:style="page.style")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
    //-v-layout(row-sm, column, child-flex-sm)
      v-flex(xs12, md4, offset-md4)
</template>

<script>
export default {
  title(){
    return this.page.content
  },
  async asyncData ({ store, route }) {
    let id = route.params.id ? route.params.id : await store.dispatch('fetchRoute', { host: store.state.host, path: route.path })
    return store.dispatch('fetchPage', { id })
  },
  data() {
    return {
    }
  },
  watch: {
    async id(){
      let id = this.$route.params.id ? this.$route.params.id : await this.$store.dispatch('fetchRoute', { host: this.$store.state.host, path: this.$route.path })
      this.$store.dispatch('fetchPage', { id })
    },
    async path(){
      let id = this.$route.params.id ? this.$route.params.id : await this.$store.dispatch('fetchRoute', { host: this.$store.state.host, path: this.$route.path })
      this.$store.dispatch('fetchPage', { id })
    }
  },
  computed: {
    path(){
      return this.$route.path
    },
    id(){
      return this.$route.params.id
    },
    user(){
      return this.$store.state.user
    },
    page() {
      return this.$store.getters.page
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
