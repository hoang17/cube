<template lang="pug">
  v-app
    v-layout(row wrap)
      v-flex(xs12, md6, offset-md3)
        v-layout(row wrap)

          v-flex(xs3, v-for="(page, i) in pages", :key="i")
            v-card.primary.ma-1(dark)
              v-card-text
                .site
                  .headline
                    a(:href="'/build/'+page._id") {{ page.content }}
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchPages')
  },
  data() {
    return {
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    pages() {
      return this.$store.state.pages
    },
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.flex
  margin-bottom 16px

.site
  height 170px

a
  text-decoration none
  color #fff
</style>
