<template lang="pug">
  //- #app
  v-app(:dark="dark")
    transition(name='fade', mode='out-in')
      router-view
      //-keep-alive(include="groups,likes,pages")
        router-view.view
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
  	return {
  	}
  },
  computed: {
    ...mapState(['dark']),
  }
}
</script>

<style lang="stylus">
  @require './app'
  // @require './reset'
</style>
