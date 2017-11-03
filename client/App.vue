<template lang="pug">
  #app(:dark="dark")
    div
      portal-target(name="modal")
    transition(name='fade', mode='out-in')
      router-view
      //-keep-alive(include="groups,likes,pages")
        router-view.view
    StyleProvider
</template>

<script>
import { mapState } from 'vuex'
import StyleProvider from './components/StyleProvider'
export default {
  name: 'app',
  components: {
    StyleProvider
  },
  computed: {
    ...mapState(['dark']),
  }
}
</script>

<style lang="stylus">
@require './reset'
@require './app'
#app
  min-height 100vh
</style>
