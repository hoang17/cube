<template lang="pug">
  v-app(:dark="dark")
    transition(name='fade', mode='out-in')
      router-view
      //-keep-alive(include="groups,likes,pages")
        router-view.view
</template>

<script>
export default {
  name: 'app',
  data() {
  	return {
      dark: true
  	}
  }
}
</script>

<style lang="stylus">
  @require './app'
</style>
